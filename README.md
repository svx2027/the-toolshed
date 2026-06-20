# The Toolshed — shivamvashisth.com

Personal site + a shed of tiny, share-first web tools. Static HTML/CSS/JS, no build step,
no backend, no tracking. Hosts anywhere (Vercel / Netlify / Cloudflare Pages) for free.

## Run locally
```bash
cd the-toolshed
python3 -m http.server 8137
# open http://localhost:8137
```

## Structure
```
index.html              personal site: hero + Thumbnail Showdown + Toolshed grid + cases + about + contact
assets/
  brand.css             the whole design system (see BRAND.md)
  shared.js             window.TS — share-card engine, toast, confetti, helpers
  showdown.js           the hero mini-game
  favicon.svg
  og-*.png              social preview images (generated)
t/<slug>/index.html     one folder per tool → clean URL /t/<slug>/
```

## Tools
| Slug | Status | What it does |
| --- | --- | --- |
| life-in-weeks | live | your life as a grid of weeks → share card |
| read-rate | live | timed reading-speed test + comprehension gate → share card |
| year-in-emoji | live | 12 emoji + 12 words → Wrapped-style card |
| aligned | live | two-person alignment quiz via URL state → share card |
| comment-goldmine | brewing | comments → audience demand themes + content ideas (creators) |
| outlier-radar | brewing | what's overperforming in a niche, ranked (creators) |
| sealed | brewing | letter to your future self, delivered on a date |

## Deploy
Pure static. Drag the folder onto Netlify Drop, or `npx vercel --prod`, or Cloudflare Pages.
Then point `shivamvashisth.com` at the host (see GUIDE.md / the DNS steps).

## Conventions
All client-side. Add a tool by copying a `t/<slug>/` folder, linking `/assets/brand.css` +
`/assets/shared.js`, and adding an entry to the `TOOLS` array in `index.html`.
