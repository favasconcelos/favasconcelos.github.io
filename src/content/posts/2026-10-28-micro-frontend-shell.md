---
title: Building a micro-frontend shell
date: 2026-10-28
summary: Placeholder project write-up about composing independently deployed frontends into one shell.
tags: [project, architecture, frontend]
---

This is a **placeholder** project post. It exists to check headings, code, lists and links render properly.

## The problem

Several teams ship UI into one product. Each wants to deploy on its own schedule, and none of them wants to break the others.

## The approach

A thin shell owns routing, authentication and the layout. Each team exposes a remote that the shell loads at runtime.

```tsx
import { lazy, Suspense } from 'react';

const Remote = lazy(() => import('remote/App'));

export function Page() {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <Remote />
    </Suspense>
  );
}
```

### Things that went well

- Teams deploy independently
- The shell stays small
- Shared dependencies are declared once

### Things that hurt

- Version skew between shared libraries
- Debugging across remote boundaries

Inline code like `import()` should look different from block code, and [links](https://example.com) should be easy to spot.
