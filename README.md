# AMAKEUR｜野造

Independent digital studio site — **I don't code. I make.**

- Production domain: [amakeur.com](https://amakeur.com)
- Stack: Astro + TypeScript + Tailwind CSS 4
- Repo: [github.com/Votoy/amakeur](https://github.com/Votoy/amakeur)

## Live preview

Typography polish (Sep 2026): Fraunces + Source Sans 3 + JetBrains Mono; locked slogan *Amateur at code. Serious about making.*; theatrical hero, indexed catalog, editorial blog, clay accent.

**Public HTTPS:** https://serum-webcams-homes-note.trycloudflare.com

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
| `/` | Home — hero: *I don't code. I make.* |
| `/apps` | Software |
| `/games` | Games |
| `/web` | Interactive / experimental sites |
| `/labs` | Vibecoding experiments |
| `/blog`, `/blog/[slug]` | Writing |
| `/about` | Studio manifesto |
| `/rss.xml` | RSS |
| `/sitemap-index.xml` | Sitemap |
| `/robots.txt` | Robots |

## Edit content

- **Blog posts:** `src/content/blog/*.md` (title, description, pubDate, tags…)
- **Projects:** `src/content/projects/*.md` (category: apps|games|web|labs; status: shipping|experiment|archived|concept)
- **Site copy / nav:** `src/lib/site.ts`
- **Design tokens:** `src/styles/global.css` (`@theme` + `.dark`)
- Collections: `src/content.config.ts`

## Design notes

Quiet Linear / Read.cv energy — no cheap gradients or glow spam. Spacing 4…128, 2–3 radii, semantic light/dark. Blog measure ~640–760px. Motion 150–350ms CSS-first; theme toggle without flash; hero secondary line on hover/click.
