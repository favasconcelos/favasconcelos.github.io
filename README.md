# avasconcelos.com

Personal website for Felipe Vasconcelos — built with React, TypeScript, Vite, and Tailwind CSS.

**Live**: [avasconcelos.com](https://avasconcelos.com)

## Tech Stack

- **React 19** — UI
- **TypeScript 5** — type safety
- **Vite 6** — build tool
- **Tailwind CSS 4** — styling
- **oxlint** — linting

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start dev server                 |
| `npm run build`   | Type-check + production build    |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Lint with oxlint                 |

## Deployment

Automated via GitHub Actions on every push to `main`:

- **CI** — lint + build on every push/PR
- **CD** — deploys to GitHub Pages (`gh-pages` branch)
