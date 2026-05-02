# Designing Agents for Serendipity

A cinematic, scroll-driven framework piece built with Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, and Lenis smooth scrolling. Presents the 3T Framework for agentic design in a dark, presentation-style format.

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Editing content

All copy lives in [`lib/content.ts`](lib/content.ts) as a typed array of `SceneData` objects and an `industryData` array. Edit there — the page re-renders automatically in dev mode.

**Scene fields:**
- `id` — anchor ID for the section
- `type` — controls which layout renders (`hero`, `body`, `cards`, `framework-hero`, `industry-flow`, `pixar-hero`, `practice-cards`, `thesis`)
- `heading`, `body`, `pullquote`, `closingLine`, `footnote`, etc.

**Adding an industry tab** (Scene 6): add a new entry to the `industryData` array in `content.ts`. Follow the existing `IndustryData` interface — each entry needs an `id`, `label`, and exactly two `tasks`.

---

## Image files

Two images are referenced but need to be dropped in manually:

| File | Where to drop it | Used in |
|---|---|---|
| `3t-framework.png` | `/public/3t-framework.png` | Scene 5 — The 3T Framework |
| `pixar-atrium.png` | `/public/pixar-atrium.png` | Scene 8 — Pixar understood this |

Both images show a placeholder with instructions until the real file is present. The page builds and deploys without them.

Recommended dimensions: **1100×619px** (16:9), PNG or WebP.

The OG/social card also uses `3t-framework.png`. If you want a different social card image, drop it at `/public/og-image.png` and update `ogImage` in `app/layout.tsx`.

---

## Deployment to Vercel

1. Push this repo to GitHub (or GitLab / Bitbucket)
2. Go to [vercel.com/new](https://vercel.com/new) → **Import from GitHub**
3. Select this repo — Vercel auto-detects Next.js
4. Click **Deploy**

No environment variables required. The `vercel.json` at the root is already configured.

Once deployed, update `siteUrl` in `app/layout.tsx` to match your `*.vercel.app` URL (or custom domain) so Open Graph tags resolve correctly.

---

## Project structure

```
app/
  globals.css         # CSS variables, fonts, scrollbar, noise texture
  layout.tsx          # Root layout — metadata, OG tags, favicon
  page.tsx            # Main page — renders all scenes in order
components/
  Card.tsx            # Expandable card (not currently used in active scenes)
  IndustryFlow.tsx    # Tab switcher + animated 3T filter flow (Scene 6)
  ProgressBar.tsx     # Scroll progress indicator (top of page)
  PullQuote.tsx       # Animated centered pull quote
  Scene.tsx           # Scene router — handles all scene types
  ScrollIndicator.tsx # Animated scroll chevron (hero)
  SmoothScroll.tsx    # Lenis smooth scroll (desktop only — touch uses native)
  StaticCard.tsx      # Non-interactive card with number/title/subtitle/body
lib/
  content.ts          # All copy, scene data, and industry flow data
public/
  favicon.svg         # BCG-green "3T" mark on dark background
  3t-framework.png    # Drop in — used in Scene 5
  pixar-atrium.png    # Drop in — used in Scene 8
```
