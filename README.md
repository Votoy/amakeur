# AMAKEUR｜野造

Independent digital studio site — **I don't code. I make.**

- Production domain: [amakeur.com](https://amakeur.com)
- Stack: Astro + TypeScript + Tailwind CSS 4
- Repo: [github.com/Votoy/amakeur](https://github.com/Votoy/amakeur)

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

- **Blog posts:** `src/content/blog/*.md`
- **Projects:** `src/content/projects/*.md`
- **Site copy / nav:** `src/lib/site.ts`
- **Design tokens:** `src/styles/global.css`

## Design notes

Quiet Linear / Read.cv energy. Spacing 4…128, semantic light/dark, blog measure ~640–760px. Motion 150–350ms CSS-first.
