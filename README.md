# The Toolshed

Personal site and a shed of tiny, share-first web tools, live at
[shivamvashisth.com](https://shivamvashisth.com).

Built by a YouTube strategist who ships automation: the site is both a portfolio
and a lab for small tools that people actually share.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4, Framer Motion 12
- Supabase (Postgres) for the subscribe list: insert-only RLS, so even the
  browser-safe publishable key can never read the list
- PWA service worker, Vercel Analytics, deployed on Vercel

## What's inside

- **Landing site** (`src/app`, `src/components`): hero with the Thumbnail
  Showdown mini-game, tool garage, creators directory, jargon decoder, koi pond,
  theme system, contact and subscribe flows.
- **Static share-first tools** (`public/t/<slug>/`), each a clean URL:

| Tool | What it does |
| --- | --- |
| life-in-weeks | your life as a grid of weeks, ends in a share card |
| read-rate | timed reading-speed test with a comprehension gate |
| year-in-emoji | 12 emoji + 12 words, Wrapped-style card |
| aligned | two-person alignment quiz passed via URL state |
| drift | ambient focus drift timer |
| sealed | letter to your future self, delivered on a date |
| comment-goldmine | comments to audience-demand themes (brewing) |
| outlier-radar | what's overperforming in a niche (brewing) |

- **Subscribe API** (`src/app/api/subscribe/route.ts`): server-side proxy to
  Supabase with a honeypot field, hashed-IP rate limiting, uniform responses to
  avoid email enumeration, and no service-role key anywhere.

## Run locally

```bash
npm install
npm run dev
```

## Design notes

Security choices are documented inline where they live (see the subscribe
route). The Supabase key in the fallback is a publishable anon key by design:
row-level security allows INSERT only, so it cannot read anything.
