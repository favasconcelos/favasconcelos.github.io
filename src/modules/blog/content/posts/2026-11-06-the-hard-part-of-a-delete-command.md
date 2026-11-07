---
title: 'The hard part of a delete command is saying no'
date: 2026-11-06
summary: 'Designing reclaim-cli: staleness heuristics, git index side effects, and the refusal rules that make a destructive command safe.'
tags: [cli, tooling, disk]
draft: false
---

Some of us keep a lot of random projects. Mine are spread across different folder levels because that is how I find them again: a work folder, a scratch folder, an OSS folder, a folder of experiments. Most of them have a `node_modules`, and often a `dist`, a `build`, or an Xcode `DerivedData` directory. At some point I had around 50 of them, and those regenerable folders were taking a lot of space while they waited for the day I came back.

[`reclaim-cli`](https://npmx.dev/package/reclaim-cli) is the tool I use so I do not have to think about it. It scans the folders I watch, tells me which projects are stale and how much their artifacts take, and cleans them when I ask. Setup is `reclaim-cli init`; after that, the daily scan and the terminal hook do the reminding.

The tool itself is not complicated. It finds projects you have not touched in a while and deletes their regenerable build output: `node_modules`, `.build`, Xcode `DerivedData`, Gradle `build`. Source files are out of scope.

The deletion is one line. The product is the set of things it refuses to do.

## The pipeline

Five stages, each answering one question:

| Stage   | Question                                        |
| ------- | ----------------------------------------------- |
| Scan    | Where are the project roots?                    |
| Judge   | Is this project stale, and is it safe to clean? |
| Measure | How big are the artifacts?                      |
| Remind  | Is it worth interrupting the user?              |
| Clean   | Remove only the artifacts, and log it.          |

A scan of a fixture with four projects looks like this:

```text
PROJECT                                            TYPE   IDLE   SIZE   CLEANABLE
/tmp/opencode/reclaim-demo/projects/old-app        node   3mo    20 KB  node_modules, dist
/tmp/opencode/reclaim-demo/projects/tracked-build  node   3mo    12 KB  node_modules
/tmp/opencode/reclaim-demo/projects/dirty-app      node   3mo    12 KB  skipped: uncommitted changes

2 stale projects, 33 KB reclaimable (4 scanned, stale after 60 days)
```

`active-app` is the fourth project. It was touched today, so it is not in the list. `dirty-app` is stale, but it has an uncommitted change, so it is listed and skipped. `tracked-build` has a `build/` directory, but that directory is committed, so it is not treated as an artifact.

The dry run shows exactly what would be removed:

```text
○ would remove /tmp/opencode/reclaim-demo/projects/old-app node_modules (12 KB)
○ would remove /tmp/opencode/reclaim-demo/projects/old-app dist (8 KB)
○ would remove /tmp/opencode/reclaim-demo/projects/tracked-build node_modules (12 KB)

Dry run: 33 KB would be reclaimed.
```

This is a fixture, not my home directory. The numbers are there to show the decisions, not to claim a disk-space win.

## Decision 1: the outermost project root wins

The scanner walks the watched folders and stops at the first directory that looks like a project: a `package.json`, a `Package.swift` or an `.xcodeproj`, a Gradle settings or build file. It does not descend into a project to find more projects.

The alternative is to treat every `package.json` as a project. In a monorepo that produces one report per package, and the same `node_modules` question repeated for each workspace. The outermost rule makes a monorepo one project: either the whole thing is stale or none of it is.

The cost is that a monorepo with one active package and nine abandoned ones stays active. That is the right default for a tool whose job is to delete build output, not to grade individual packages.

## Decision 2: staleness is three signals, not one mtime

A project is stale when its most recent sign of life is older than `staleAfterDays` (60 by default). The sign of life is the newest of:

- the newest source-file mtime, excluding artifact directories;
- the last commit time;
- the mtime of `.git/HEAD` and `.git/index`.

The last one matters more than it looks. A pull, a checkout, or a commit can update git's state without changing the mtime of any source file. Without those two files, a repository you fetched yesterday could look months old.

The cost is that mtime is a proxy for attention, not a measurement of it. Touch a README, and the project is active again. Run a script that rewrites a lockfile, and the same thing happens. The walk is capped at 100,000 files per project, so on a very large tree the newest file can sit beyond the cap and the project can look older than it is. That errs toward deleting, which is the wrong direction. The cap is high enough for my projects, but it is a real limit.

## Decision 3: `git status` must not count as activity

This was the bug that took the longest to see.

To decide whether a stale project is dirty, the scanner runs `git status`. By default, `git status` refreshes the index and writes it back ([git-status, Background Refresh](https://git-scm.com/docs/git-status#BACKGROUNDREFRESH)). The index is one of the activity signals. So the act of checking whether a project was safe to clean made it look active, and the project did not appear in the report.

The fix is one flag:

```ts
run('git', ['--no-optional-locks', 'status', '--porcelain', '--', '.'], { cwd: root })
```

`--no-optional-locks` tells git not to take the optional lock and write the refreshed index. The check stays read-only. It is a good example of a tool changing the state it is trying to observe.

## Decision 4: only delete what is regenerable or proven ignored

Every artifact has a safety class:

| Type    | Always removable                                                           | Removable only if git-ignored        |
| ------- | -------------------------------------------------------------------------- | ------------------------------------ |
| Node    | `node_modules`, `.next`, `.nuxt`, `.turbo`, `.svelte-kit`, `.parcel-cache` | `dist`, `build`, `out`, `coverage`   |
| Swift   | `.build`, matching Xcode `DerivedData`                                     | `.swiftpm`, `Pods`, `Carthage/Build` |
| Android | `build`, `.gradle`, `.cxx` next to a Gradle file                           | —                                    |

The split is deliberate. `node_modules` is rebuildable from a lockfile. A `dist` directory is not: it can be a checked-in release, a static site you edited by hand, or the output of a build someone else runs. So `dist` is only removed when `git check-ignore` says the repository does not track it.

The cost is that a gitignored `dist` can still contain something you wanted. The tool trusts `.gitignore` as the declaration of what is regenerable. If that declaration is wrong, the tool is wrong.

## Decision 5: skip dirty and unpushed projects

`skipDirty` is on by default. A stale project with uncommitted changes is listed but not cleaned. A stale project with commits that are not on any remote is also skipped, but only when the repository has a remote; a local-only repository has nothing to push to, so its commits cannot be "unpushed".

The dirty check is `git status --porcelain`. The unpushed check is:

```ts
run('git', ['rev-list', '--count', 'HEAD', '--not', '--remotes', '--', '.'], { cwd: root })
```

If the repository has no remote, the unpushed check is skipped. If it has one and `rev-list` reports commits, the project is protected. A non-git directory has no dirty check at all; the scanner only deletes artifacts there, not source, but it cannot warn you about unsaved work.

The cost is that a repository with a single forgotten scratch file is not cleaned until you deal with it. That is the intended trade: the tool should annoy you before it deletes something.

## Decision 6: refuse paths outside their scope, and refuse symlinks

The scanner knows which directory an artifact belongs to. The cleaner checks every removal against that scope, and against a short list of protected paths:

```ts
export function removalBlocker(path: string, scope: string): string | null {
  const target = resolve(path)
  const boundary = resolve(scope)
  const home = resolve(homedir())
  if (target === home) return 'refusing to remove a protected path'
  if (parse(target).root === target) return 'refusing to remove a protected path'
  if (!isInside(target, boundary)) return `path is outside its allowed scope (${boundary})`
  return null
}
```

Before removing, it calls `lstat` and refuses symlinks and non-directories. Xcode's `DerivedData` is the one artifact that lives outside the project, so it gets an explicit scope: the `DerivedData` directory, not the home directory.

The cost is a time-of-check-to-time-of-use window: the filesystem can change between the check and `rm`. `rm` on a symlink removes the link, not the target, so the blast radius is limited, but this is not a transactional delete. I check immediately before removing and log every removal. There is no undo.

## Decision 7: no daemon

The daily scan is installed into the OS scheduler: launchd on macOS, systemd or cron on Linux, Task Scheduler on Windows. The terminal reminder is a small shell script sourced from your shell rc file. The script does not start Node; it prints a pending line and registers shell completion.

That split is deliberate. A Node process on every shell startup is too expensive. A daemon is another thing to keep alive, and another thing that can fail silently. The OS already knows how to run something once a day.

The cost is state: the scheduler stores the absolute path to Node and to the CLI. Switch Node versions and the job breaks. `reclaim-cli schedule status` reports it, and `schedule install` fixes it. The shell hook is also per-platform, per-shell surface area, and it is the part I expect to break first.

## Ideas for future me

- **Ship the platform matrix first.** Starting with macOS only made `npm ci` fail on Linux CI and pushed the cross-platform work to 0.4.0. Next time, I would wire the intended platforms into CI from the first release.
- **Add an undo.** The history log tells me what was removed, not how to put it back. Undo is the next safety feature I want.
- **Cover more project types.** Rust `target/`, Python `.venv`, and Go build caches are not handled yet. Each one needs its own safety rules, not just a path.
- **Make staleness less dependent on mtime.** Touching a README currently resets the clock. I would like a signal closer to actual use, and a dirty check for non-git folders, which today have none.
- **Measure the real numbers.** I have not run a controlled before/after across my own machine. The fixture shows the decisions; it does not show a reclaimed gigabyte.
- **Make the Xcode match resilient.** `DerivedData` is matched by reading `WorkspacePath` from `info.plist`. If that format changes, I want a fallback that still finds the folder.

## Try it

```sh
npm install -g reclaim-cli
reclaim-cli init
reclaim-cli scan
reclaim-cli clean --dry-run
```

`reclaim-cli` is MIT, on [npm](https://npmx.dev/package/reclaim-cli), and the source is at [favasconcelos/reclaim-cli](https://github.com/favasconcelos/reclaim-cli). The output above is from 0.4.0, November 2026, against a four-project fixture.

A delete command is mostly a list of refusals. The more of them you can state before the first `rm`, the easier it is to trust the one that runs.

---

_This is part of a series about small tools I built for repetitive tasks. The others: [Git doesn't record that you pushed](/blog/git-doesnt-record-that-you-pushed) and [One login at a time](/blog/one-login-at-a-time)._
