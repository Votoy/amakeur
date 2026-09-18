# AMAKEUR｜野造

Independent digital studio site — **I don't code. I make.**

- Production: [amakeur.com](https://amakeur.com)
- Stack: Astro + TypeScript + Tailwind CSS 4
- Repo: [github.com/Votoy/amakeur](https://github.com/Votoy/amakeur)

## Live preview

Craft micro-details (Sep 2026): circular theme wipe, reading progress, copy-link, studio clock + wit, `?` shortcuts, sliding nav indicator, external arrows, 404, focus rings, logo wink + console stamp. Fraunces + Source Sans 3; locked slogan *Amateur at code. Serious about making.*

**Public HTTPS:** https://aquatic-mary-fever-allowed.trycloudflare.com

Cloudflare quick tunnel serving local `dist/` (ephemeral). Durable: GitHub Pages workflow, or deploy `dist/`.

## Quick start

```bash
npm install
npm run dev
npm run build
npm run preview
```

Node.js ≥ 22.12 required.

## Routes

| Path | Purpose |
|------|---------|
| `/` | Home — hero: *I don't code. I make.* |
| `/apps` | Software |
| `/games` | Games |
| `/web` | Interactive / experimental sites |
| `/labs` | Vibecoding experiments |
| `/blog`, `/blog/[slug]` | Writing |
| `/about` | Studio manifesto |
| `/rss.xml` | RSS |

## Design notes

Quiet Linear / Read.cv energy — no cheap gradients or glow. Motion 150–350ms; theme wipe without flash; hero secondary on hover/click. Press `?` for shortcuts.
