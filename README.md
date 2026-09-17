# AMAKEUR｜野造

Independent digital studio site — **I don't code. I make.**

- Production domain: [amakeur.com](https://amakeur.com)
- Stack: Astro + TypeScript + Tailwind CSS 4
- Repo: [github.com/Votoy/amakeur](https://github.com/Votoy/amakeur)

## Live preview

Redesign (Sep 2026): theatrical hero, indexed catalog, editorial blog, clay accent, easter eggs.

**Public HTTPS:** https://carmen-properties-agenda-interactions.trycloudflare.com

Cloudflare quick tunnel serving local `dist/` (ephemeral while the box server runs). Durable option: GitHub Pages workflow in `.github/workflows/deploy-pages.yml`, or deploy `dist/` to Cloudflare Pages / Netlify / Surge.

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
| `/` | Home — theatrical hero: *I don't code. I make.* |
| `/apps` | Software (indexed catalog) |
| `/games` | Games |
| `/web` | Interactive / experimental sites |
| `/labs` | Vibecoding experiments |
| `/blog`, `/blog/[slug]` | Editorial writing list |
| `/about` | Studio manifesto |
| `/rss.xml` | RSS |
| `/sitemap-index.xml` | Sitemap |
| `/robots.txt` | Robots |
