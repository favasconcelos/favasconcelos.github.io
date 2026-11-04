# avasconcelos.com

Personal website for Felipe Vasconcelos — built with React, TypeScript, Vite, and Tailwind CSS.

**Live**: [avasconcelos.com](https://avasconcelos.com)

## Tech Stack

- **React 19** — UI
- **React Router** — routing (`/`, `/blog`, `/blog/:slug`)
- **TypeScript** — type safety
- **Vite** — build tool
- **Tailwind CSS 4** — styling
- **react-markdown** — blog rendering (GFM + syntax highlighting)
- **oxlint / oxfmt** — linting and formatting

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command             | Description                      |
| ------------------- | -------------------------------- |
| `npm run dev`       | Start dev server                 |
| `npm run build`     | Type-check + production build    |
| `npm run preview`   | Preview production build locally |
| `npm run lint`      | Lint with oxlint                 |
| `npm run fmt:check` | Check formatting with oxfmt      |
| `npm run check`     | Format check + lint              |

## Blog

Posts are markdown files in `src/content/posts/`, bundled at build time. To publish, add a file and push:

```md
---
title: 'Week 45: findings'
date: 2026-11-04
summary: One-line blurb shown in the post list, feed and link previews.
tags: [weekly, tooling]
draft: false
---

Markdown body (GFM tables, task lists and fenced code with syntax highlighting are supported).
```

- File name: `YYYY-MM-DD-some-slug.md`. The URL is `/blog/some-slug` (the date prefix is dropped).
- Quote titles that contain `: `.
- `draft: true` posts show up in `npm run dev` only. They are excluded from production builds, the RSS feed and the sitemap.
- `rss.xml` and `sitemap.xml` are generated at build time (`vite-plugins/blog-feed.ts`).
- Posts are English-only; the surrounding blog UI follows the site language switcher.

## Deployment

Deployed on Cloudflare Pages (`wrangler.jsonc`, output `dist/`). Unknown paths fall back to `index.html`, so `/blog/...` deep links work without extra config.

CI (`.github/workflows/ci.yml`) runs lint, format check, type-check and build on every push and PR to `main`.
