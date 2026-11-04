---
title: 'Week 44: small things worth keeping'
date: 2026-10-21
summary: Placeholder weekly post with a short list of links and one shell trick.
tags: [weekly, shell]
---

A **placeholder** short post, to see how a list of several entries looks.

## Links

- [Cloudflare Pages docs](https://developers.cloudflare.com/pages/)
- [Keep a Changelog](https://keepachangelog.com)
- [MDN: Intersection Observer](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API)

## A shell trick

```bash
# list the 10 biggest files tracked by git
git ls-files -z | xargs -0 du -h | sort -rh | head -10
```

## Checklist

- [x] Write the post
- [x] Check it in dark mode
- [ ] Publish something real
