---
title: 'One login at a time: refreshing AWS SSO inside OpenCode'
date: 2026-11-05
summary: 'The hard part of the Bedrock auth plugin is not aws sso login; it is single-flight refresh, late-arriving config, and guarding the right tool calls.'
tags: [aws, opencode, tooling]
draft: false
---

The failure has a familiar shape. A long OpenCode session is going well, then a Bedrock request comes back with an authentication error. The SSO session expired. You run `aws sso login --profile <name>`, a browser opens, you approve, and the session works again. Tomorrow it happens again.

[`opencode-aws-bedrock-auth`](https://npmx.dev/package/opencode-aws-bedrock-auth) automates that. It checks the session at startup and before `shell` and `subagent` tool calls. A successful check is cached for 20 minutes; a failed one is retried on the next call. If the credentials are invalid, it runs `aws sso login` for the configured profile.

The login command is the easy part. The plugin is mostly about who is allowed to run it, and what happens when several callers ask at once.

## The constraints

OpenCode plugins run inside the OpenCode process. There is no daemon to keep alive and no separate service to deploy. That is convenient, but it shapes the design:

- Plugin setup happens at startup. The provider configuration may be applied after setup, so the Bedrock profile can be missing when the plugin first runs.
- `aws sso login` is interactive. It opens a browser and waits for the user. Awaiting it in setup would block OpenCode from starting.
- Tool calls can arrive concurrently. Two `shell` calls at the same time must not launch two browser prompts.
- A failed login must not take down the session. The plugin logs and stays out of the way.
- The plugin must work on OpenCode 2.x. The 1.x plugin API is different; 0.2.0 is the last version for OpenCode 1.

## The flow

```text
setup
  └─ read providers.amazon-bedrock.settings.profile
       └─ if missing: stay inactive, warn once
       └─ if present: check in the background

before shell/subagent
  └─ re-read the profile (it may have appeared after setup)
       └─ if the 20-minute window has passed and no check is running:
            ├─ aws sts get-caller-identity --profile <name>
            └─ on failure: aws sso login --profile <name>

aws_refresh_token
  └─ reset the window, then run the same check
```

The manual tool exists because the automatic check is throttled. If you are about to start a long operation, you should not have to wait for the next window or trigger a `shell` call just to refresh.

## Decision 1: activate only on an explicit profile

The `amazon-bedrock` provider has built-in settings even when you have not configured a profile; region and other defaults are enough to make `settings` truthy. So the plugin cannot use "settings exist" as the activation condition. It looks for `settings.profile` specifically:

```ts
const { data } = await ctx.provider.get({ providerID: 'amazon-bedrock' })
const configured = data.settings?.['profile']
profile = typeof configured === 'string' && configured ? configured : undefined
```

That is `syncProfile` with the warning and change detection removed. If the profile is missing, the plugin stays inactive and logs one warning. It does not fall back to `AWS_PROFILE` or the default profile. That is deliberate: guessing which account to open a browser for is worse than doing nothing.

## Decision 2: do not await the first check

`aws sso login` can sit on a browser prompt for as long as the user takes. If plugin setup awaited it, OpenCode would not finish starting. So the first check is fire-and-forget:

```ts
void resolveAndCheck().catch(warn)
```

The comment in the source is explicit: none of this is awaited, because the login can wait on the browser and must not block startup. The trade-off is that the first `shell` or `subagent` call can arrive while the background check is still running. That is fine: the call awaits the in-flight promise instead of starting a second login.

## Decision 3: one login, many waiters

This is the part that matters most. The plugin keeps a `refreshInFlight` promise. Every caller that needs a check either returns early because the window has not passed, or waits on the existing promise:

```ts
let refreshInFlight: Promise<void> | null = null

async function checkAndRefresh(): Promise<void> {
  if (Date.now() - lastCheckedAt < CHECK_INTERVAL_MS) return
  if (refreshInFlight) return refreshInFlight

  refreshInFlight = (async () => {
    try {
      if (!(await isSessionValid(profile!))) await refreshSession(profile!)
      lastCheckedAt = Date.now()
    } finally {
      refreshInFlight = null
    }
  })()

  return refreshInFlight
}
```

The variable is scoped to the `setup` call, not the module, so two OpenCode sessions do not share state. `CHECK_INTERVAL_MS` is 20 minutes; `profile` and `lastCheckedAt` are the closure variables from the previous sections. The real function captures the profile at the start, so a config change cannot switch accounts in the middle of a login.

Without the single-flight guard, two concurrent `shell` calls with an expired session would both run `aws sso login`, and you would get two browser tabs and a race between two credential writes. The guard makes the second caller wait for the first login instead.

## Decision 4: stamp the window only after success

`lastCheckedAt` is set after the STS check and, if needed, the login both succeed. If either fails, the timestamp stays old, so the next guarded call tries again.

That is the right behavior for a transient failure: a network blip should not disable the plugin for 20 minutes. It is the wrong behavior for a user who cancelled the browser prompt: every subsequent `shell` or `subagent` call can reopen it. There is no backoff yet. I would add one.

## Decision 5: guard two tools, not the provider

The plugin hooks `execute.before` and only acts on `shell` and `subagent`:

```ts
await ctx.tool.hook('execute.before', async (event) => {
  if (!AWS_TOOLS.has(event.tool)) return
  await syncProfile()
  await checkAndRefresh()
})
```

Those are the tools most likely to run an AWS command. The plugin does not intercept the provider's own HTTP requests, so a long model call can still hit an expired session in the middle.

The README says the plugin keeps AI sessions from being interrupted by auth errors. A more accurate sentence is: the plugin refreshes before the tool calls it can see, and provides a manual refresh for everything else.

## Decision 6: make the session check cheap

`isSessionValid` runs `aws sts get-caller-identity --profile <name>` and treats a zero exit code as valid:

```ts
function isSessionValid(profile: string): Promise<boolean> {
  return new Promise((resolve) => {
    execFile('aws', ['sts', 'get-caller-identity', '--profile', profile], (err) => resolve(!err))
  })
}
```

The command returns the identity behind the credentials and requires no permissions ([AWS CLI reference](https://docs.aws.amazon.com/cli/latest/reference/sts/get-caller-identity.html)). It is a credential check, not a Bedrock check. A valid identity can still lack `bedrock:InvokeModel`; the plugin cannot tell the difference, and does not claim to.

The 20-minute interval is a compromise. Checking before every tool call would be more accurate and much slower; checking once an hour would miss sessions that expire in between. Twenty minutes is short enough to catch most expiries before a tool call, and long enough that the check is not the bottleneck.

## Decision 7: abort on teardown

The event subscription is tied to an `AbortController`, and the plugin returns a cleanup function that aborts it. Without that, a reloaded plugin would leave the old subscription alive and react to provider updates twice. The closure-scoped state helps here too: the old session's profile and timestamps are not shared with the new one.

## Ideas for future me

- **Back off after a failed login.** A cancelled browser prompt currently retries on the next guarded call. A short exponential backoff would make the failure quieter.
- **Cover more than two tools.** Guarding only `shell` and `subagent` leaves custom tools and provider calls uncovered. If OpenCode exposes a provider-level hook, that is the better place for the check.
- **Check model access, not just credentials.** A valid STS identity can still be denied `bedrock:InvokeModel`; a small probe would catch that earlier.
- **Say what "valid" means.** `sts get-caller-identity` succeeding does not mean the next Bedrock request will be accepted. The README should say that in one sentence.
- **Keep the OpenCode 1 release pinned.** 0.2.0 stays as the OpenCode 1 version; I do not plan to maintain both APIs.

## Try it

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": ["opencode-aws-bedrock-auth"],
  "providers": {
    "amazon-bedrock": {
      "settings": {
        "profile": "my-sso-profile"
      }
    }
  }
}
```

`opencode-aws-bedrock-auth` is MIT, on [npm](https://npmx.dev/package/opencode-aws-bedrock-auth), and the source is at [favasconcelos/opencode-aws-bedrock-auth](https://github.com/favasconcelos/opencode-aws-bedrock-auth). The code above is from 0.3.1, published October 2026, and requires OpenCode 2.x.

Auto-refreshing SSO is a single-flight concurrency problem with a login command attached. Once you see it that way, the plugin is small: one promise, one timestamp, and a guard on the calls that matter.

---

_This is part of a series about small tools I built for repetitive tasks. The others: [Git doesn't record that you pushed](/blog/git-doesnt-record-that-you-pushed) and [The hard part of a delete command is saying no](/blog/the-hard-part-of-a-delete-command)._
