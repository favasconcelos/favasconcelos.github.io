---
title: "Git doesn't record that you pushed"
date: 2026-11-07
summary: "How pushlog reconstructs push times from git's reflog, and what I'd add next."
tags: [git, cli, tooling]
draft: false
---

At the end of a workday I can usually remember what I did. I cannot remember which of it left the laptop.

The question sounds like a job for `git log --author=me`. That command answers a different question: what did I commit. A commit can sit on a local branch for a week, or forever. It can also be on a remote without this machine having any record of putting it there.

I built [`pushlog`](https://npmx.dev/package/pushlog) to answer the narrower question across every repository on the machine: which commits are mine, and which ones are actually pushed?

The output looks like this:

```text
pushlog  Sat 2026-11-07   5 commits · 2 pushed · 3 local only · 3 active repos (of 3 scanned)

▸ repo-a  (2 commits, 1 pushed)
    12:35  dc28a0b  ↑ 12:35   feat: first change  main
    12:35  8018a69  ✗ local   wip: second change  main

▸ repo-b  (1 commit, 0 pushed)
    12:35  53b1019  ✗ local   docs: local only  main

▸ repo-c  (2 commits, 1 pushed)
    12:35  dc28a0b  ↑ remote  feat: first change  HEAD
    12:35  83b63b3  ✗ local   chore: cloned then committed  main
```

`↑ 12:35` means a push from this machine, at 12:35. `↑ remote` means the commit is on a remote, but this machine has no record of pushing it. `✗ local` means it is not on any remote this repository knows about.

The three states come from refs, not from the commit.

## A commit has no push field

A git commit object holds a tree, its parents, an author, a committer, and a message. There is no remote name, no push time, no `pushed` boolean. Push state lives in refs, and the history of refs lives in the reflog.

That distinction is easy to miss because `git status` usually says something reassuring. It only compares the current branch to its upstream. It has nothing to say about the other branches in that repo, or the other repositories on the machine.

## The reflog records the push, not the commit

Here is the smallest reproduction I could make. It uses a bare repository as the "remote", so nothing leaves the machine:

```sh
git init --bare origin.git
git init work && cd work
git commit -m 'feat: first change'
git remote add origin ../origin.git
git push -u origin main
git reflog show --all --date=iso --format='%h %gD %gs'
```

The relevant line is this one:

```text
dc28a0b refs/remotes/origin/main@{2026-11-07 12:35:01 +0100} update by push
```

Git updated `refs/remotes/origin/main` when the push completed, and wrote a reflog entry with the subject `update by push`. The selector carries the time. That is the only local record that a push happened, and it belongs to the ref, not to `dc28a0b`.

Make one more commit and ask `git status`:

```text
## main...origin/main [ahead 1]
```

The new commit is ahead. The old one is still contained in `refs/remotes/origin/main`. The reflog has one push entry, not two. A push moves the ref tip; it does not stamp every commit it carries.

## Reading the reflog

`pushlog` reads every reflog, keeps the entries whose subject is exactly `update by push`, and records the earliest push time per tip:

```ts
export async function readPushes(gitDir: string): Promise<Push[]> {
  const result = await git(gitDir, [
    'reflog', 'show', '--all', '--date=unix', `--format=%H${SEP}%gD${SEP}%gs`,
  ])
  const earliest = new Map<string, number>()
  for (const line of result.stdout.split('\n')) {
    const [sha, selector, message] = line.split(SEP)
    if (!sha || message !== 'update by push') continue
    const match = /^refs\/remotes\/.+@\{(\d+)\}$/.exec(selector ?? '')
    if (!match) continue
    const at = Number(match[1])
    const known = earliest.get(sha)
    if (known === undefined || at < known) earliest.set(sha, at)
  }
  return [...earliest].map(([sha, at]) => ({ sha, at })).sort((a, b) => a.at - b.at)
}
```

`SEP` is a unit separator (`\u001f`), and `git()` is a thin wrapper around `git --git-dir <dir> …` that returns stdout. Both are elided here; the full file is linked at the end.

`%gD` expands to the reflog selector, for example `refs/remotes/origin/main@{1794050101}`. `%gs` is the reflog subject. The regex keeps only remote-tracking selectors and pulls the Unix timestamp out of `@{…}`.

A commit can be older than the push that carried it, so matching on SHA equality would miss almost everything. The check is ancestry:

```ts
async function findPush(gitDir: string, commit: RawCommit, pushes: Push[]): Promise<Push | null> {
  for (const push of pushes) {
    if (push.at < commit.committedAt - CLOCK_SKEW_SECONDS) continue
    if (await isAncestor(gitDir, commit.fullSha, push.sha)) return push
  }
  return null
}
```

`isAncestor` is `git merge-base --is-ancestor <commit> <push-tip>`. The first recorded push whose tip contains the commit is the earliest time it can have left the machine. The 60-second allowance handles commits made on a clock slightly ahead of the push.

The `Push` and `RawCommit` types are omitted from the snippets. Both are small objects with a SHA and a timestamp; the full definitions are in the repository.

## When there is no push record

Reflogs expire. Git keeps reachable entries for 90 days by default, and unreachable ones for 30 ([`gc.reflogExpire`](https://git-scm.com/docs/git-config#Documentation/git-config.txt-gcreflogExpire)). A fresh clone has no push entries at all: cloning updates `refs/remotes/origin/main`, but it does not create an `update by push` entry.

So `pushlog` needs a third state. If no push record exists, it asks whether any remote-tracking ref contains the commit:

```ts
export async function isOnRemote(gitDir: string, sha: string): Promise<boolean> {
  const result = await git(gitDir, ['for-each-ref', '--count=1', '--contains', sha, 'refs/remotes'])
  return result.stdout.trim().length > 0
}
```

That is the `↑ remote` case: on a remote, but pushed from somewhere else, or pushed here longer ago than the reflog remembers. If neither check succeeds, the commit is `✗ local`.

I verified the fresh-clone case in the same reproduction:

```text
$ git clone origin.git fresh && cd fresh
$ git reflog show --all --format='%gs' | grep -c 'update by push'
0
```

## Whose commits are these?

The report only means something if "mine" is defined. `pushlog` takes the union of the repository's `user.email`, the global `user.email`, and any `--author` values. That covers the common `includeIf` setup where work repos use a work address and personal repos use another.

The match is literal, not a regex: `git log` is called with `--fixed-strings --regexp-ignore-case`. Email addresses contain `.` and `+`. A regex match on `me@example.com` also matches `me@exampleXcom`, and the `+` in `me+tag@example.com` is a quantifier, not a literal. This is the kind of bug that produces a report full of someone else's commits.

A repository with no identity at all is skipped rather than showing every commit in it. `--all-authors` turns the filter off.

## What it costs

The first run walks the roots (default `$HOME`) looking for `.git` entries, skipping `node_modules`, `Library`, `.cache` and similar. Linked worktrees collapse into their main repository. The resulting list is cached for 12 hours, because the walk is the slow part. Repos are processed 8 at a time.

The tool does not make network requests. It reads local refs and local reflogs. That is why it is fast and why it cannot tell you that a branch was deleted on the remote five minutes ago.

## What I'd add next

pushlog 0.1.0 is a local reconstruction, so there are a few edges I would like to smooth out:

- **A `--verify` flag.** `↑ remote` is only as fresh as the last fetch or push. Asking the remote with `git ls-remote` would give a current answer when I need one.
- **A localized-reflog check.** I match the literal `update by push`. I have not tested a non-English git; if that message is translated, pushes degrade to `↑ remote`.
- **A clearer label for pushes from another machine.** `↑ remote` is accurate, but it is easy to read as "I pushed it". "Not pushed from here" says what it means.
- **A configurable reflog window.** Git's 90-day default decides how far back push times go. I would like the report to say when it is guessing.

For a stand-up report, local and fast is the right trade; `--verify` would be the escape hatch.

## Try it

```sh
npm install -g pushlog
pushlog yesterday
pushlog --days 7
pushlog --json | jq '.totals'
```

`pushlog` is MIT, on [npm](https://npmx.dev/package/pushlog), and the source is at [favasconcelos/pushlog](https://github.com/favasconcelos/pushlog). The snippets above are from 0.1.0, November 2026; the repository is the authority if the code has moved.

The next time a tool tells you a commit was pushed, ask which ref it looked at. If the answer is the commit itself, it is guessing.

---

_This is part of a series about small tools I built for repetitive tasks. The others: [The hard part of a delete command is saying no](/blog/the-hard-part-of-a-delete-command) and [One login at a time](/blog/one-login-at-a-time)._
