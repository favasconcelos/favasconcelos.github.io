---
title: 'Week 45: findings'
date: 2026-11-04
summary: Placeholder weekly post. A few tools, one dependency worth watching, and an idea I want to try.
tags: [weekly, tooling]
---

This is a **placeholder** weekly post, used to test the blog locally. Replace it with real content whenever you like.

## What I looked at

- A faster linter that replaced a slow one in a side project
- Why pinning exact versions is worth the extra `npm install` noise
- A small idea for caching build output between CI runs

## A dependency worth watching

[Vite](https://vite.dev) keeps getting faster, and the plugin ecosystem keeps getting smaller and simpler. Here is the sort of config I like to see:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

## Quick comparison

| Tool    | Written in | Used for   |
| ------- | ---------- | ---------- |
| oxlint  | Rust       | Linting    |
| oxfmt   | Rust       | Formatting |
| esbuild | Go         | Bundling   |

> Small tools that do one thing well are easier to trust, and easier to replace.

## Idea for next week

1. Measure how long CI actually takes, step by step
2. Remove whatever is not earning its time
3. Write it up here
