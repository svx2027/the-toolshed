# Code for Creatives India — Handoff (shivamvashisth.com)

## One-paragraph summary
This is **Shivam Vashisth's** two-property personal web project. Shivam is a YouTube
strategist who builds with AI, NOT an engineer: explain everything in plain English,
define jargon, work in small verifiable steps. **(1) shivamvashisth.com** = the main
site, brand **"Code for Creatives India"** (creatives · creators, creatives-primary):
a **Next.js 16 + React 19 + TypeScript + Tailwind v4 + Framer Motion 12** app with a
full-screen "Index" overlay nav, a featured Mission manifesto band, a hero
**Thumbnail Showdown** game (164 baked same-niche pairs, plays offline via a service
worker), a real Supabase-backed email capture, and a koi-pond lantern background that
self-dismisses after ~16s. The 8 tiny tools ("the Garage") are still plain static HTML
in `public/t/<slug>/`. **(2) files.shivamvashisth.com** = a Spotlight-style file vault
(separate repo `svx2027/shivam-download-files`, same stack + Supabase). Everything is
live and verified; all 5 site versions are reachable as git tags.

## Where things live
| Thing | Location |
|---|---|
| Main site code | `~/code/the-toolshed` (T7 SSD was offline; ask before moving to `/Volumes/t7-denzen/code_external/`) |
| Repo (private) | `svx2027/the-toolshed`, branch `main`, push = auto-deploy on Vercel (team `svx2028`) |
| Live | https://shivamvashisth.com (GoDaddy DNS: apex `A @ 216.198.79.1`) |
| Vault code / repo / live | `~/code/shivam-download-files` / `svx2027/shivam-download-files` / https://files.shivamvashisth.com |
| Latest commit / tag | `ec58d33` / `v11-copy-counter` |
| Version history | git tags: `v1-static` → `v2-nextjs` → `v3-rule-of-three` → `v4-refinements` → `v5-showdown-offline` → `v6-leverage` → `v7-tastemaxxing-drop01` → `v8-drop01-email-capture` → `v9-resource-index` → `v10-instructions-first` → `v11-copy-counter`. `git checkout <tag>` opens any past version. Tag new releases the same way. |
| SVX prompt drops (v7–v11) | **Full brief: `/Users/denzen/code/personal/instagram-competitive-analysis/SVX2027_SERIES_HANDOFF.md`.** `/svx2027-tastemaxxing-01/` page (route in `src/app/`, prompts served byte-identical from `public/prompts/*.md`, copy buttons with in-app-browser execCommand fallback). `src/lib/resources.ts` = single source of truth → homepage "Free resources" index (`#resources`) + ItemList JSON-LD + sitemap + short-link/typo redirects (`/svx01`) in `next.config.ts`. Payloads instructions-first: human setup lives on the page, never in the .md. Email capture → `/api/subscribe/` (Supabase `subscribers`, `source` col). **Copy counter → `/api/event/` (Supabase `events`, insert-only RLS, table CREATED 2026-07-04); client `src/lib/track.ts` beacons via sendBeacon — MUST use trailing slash `/api/event/` or the 308 drops the POST.** Vercel Web Analytics = ENABLED + working (its script loads from an obfuscated `/<hash>/script.js`; check `window.va`, don't grep for "insights"). Site email = vashisthshivam00@gmail.com (Nav, Footer, `public/assets/shared.js`) until Zoho mailbox exists. Honesty fixes shipped: Trust "No bot pretending to be me" (was false "No auto-DM"), Build Notes anonymous-counts-only. |
| SVX open items | Google Search Console (not set up), Zoho email hi@ (blocked on account creation — owner must create), purge `subscribers` test rows `test-drop01-*@shivamvashisth.com`. GA4 deliberately NOT used. See the series handoff §7. |
| Session memory | `~/.claude/projects/-Users-denzen-code/memory/the-toolshed-project.md` |

## Creator shelf (/creators/)
Public page listing the creators Shivam learns AI from, so he can drop ONE link in
an Instagram comment reply. Per creator: photo (or monogram fallback), social chips
with inline SVG icons, his review, and one "best work" CTA.
- **Single source of truth:** `src/lib/creators.ts` (the `CREATORS` array + `Creator`
  type). A build-time `validateCreators()` at the bottom FAILS `npm run build` on:
  duplicate/non-kebab slug, zero socials, an em-dash or "ten times" in any copy field,
  a placeholder host (bare `substack.com`/`example.com`), or fewer than 2 creators.
- **Photos:** drop a square file at `public/creators/<slug>.jpg` (lowercase; `.jpg`
  beats `.jpeg`/`.png`/`.webp` in the lookup order). `fs.existsSync` picks it up at
  build; no file = a pastel monogram tile. 640x640 min, EXIF stripped, ≤150KB. NOTE:
  Vercel builds on Linux (case-sensitive) — keep slug and filename lowercase-identical.
  CSP allows only local + ytimg images, so photos MUST be self-hosted (never hotlink).
- **Page title count is computed** from `CREATORS.length` ("The 5 creators…"); adding
  one updates the title, JSON-LD ItemList, and sitemap automatically.
- **Tracking:** each best-work CTA fires `creator_best_<slug>` via `TrackedLink`
  (`src/components/TrackedLink.tsx`) → `/api/event/`. The event route allows that
  name via a regex (`/^creator_best_[a-z0-9-]{1,32}$/`), so new creators need NO route
  edit. Social chips are deliberately untracked (anti-funnel).
- **Redirects:** `/mentors` and `/people` → `/creators/` (in `next.config.ts`).
- **Reviews are Shivam's voice, not fabricated creator quotes.** They sit under a
  "Why it made my list" label. Never put words in a creator's mouth; the sameAs JSON-LD
  only lists confirmed handles.
- **Add-a-creator runbook:** copy the commented template at the bottom of `creators.ts`,
  fill it with his words, (optional) add the photo, `npm run build`, check both themes,
  commit + tag `v<next>-creator-<slug>`, push.

## Glow CTAs (both themes)
`--glow-rgb` + `--glow-a` in `globals.css` flip per theme (lavender halo, brighter in
dark). `.cta-glow` = always-on breathing (drop-page copy buttons, homepage hero
`Hero.tsx`). `.cta-glow-card` = a calm resting ring that only breathes while its
`.creator-card.in` (so 5 cards never pulse at once; no-JS visitors keep the ring).
Hover locks the glow on; reduced-motion kills all of it.

## Tech stack (main site)
Next.js 16.2.9 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4
(CSS `@theme` in `src/app/globals.css`, **no tailwind.config**) · Framer Motion 12.
Dark mode = `.dark` class + `data-theme` attr on `<html>`, anti-FOUC inline script,
shared localStorage key `ts_theme` (tools use the same key). `vercel.json` pins
`framework: nextjs` and holds the strict security headers/CSP. Next 16 gotcha: check
`node_modules/next/dist/docs/` before unfamiliar APIs.

## Key file map
- `src/app/layout.tsx` — fonts, metadata/OG, JSON-LD, anti-FOUC script, `<Pwa/>`
- `src/app/page.tsx` — section composition; About has the faint `svx2027` watermark + "Shivam Vashisth" signature
- `src/app/globals.css` — brand tokens (light + `.dark`), `[data-reveal]` scroll-reveal CSS, cta-glow
- `src/app/api/subscribe/route.ts` — email capture endpoint (see Infra)
- `src/app/sitemap.ts`, `robots.ts`
- `src/components/` — `Nav.tsx` (Index overlay: X close, 3 destinations, persistent Files pill, scroll-progress bar), `Hero.tsx` (2 doors + "creatives · creators" wink), `Mission.tsx` (manifesto band), `Showdown.tsx` (game), `Garage.tsx`, `ContactForm.tsx`, `KoiPond.tsx`, `Pwa.tsx`, `Reveal.tsx` + `RevealController.tsx`, `ThemeToggle.tsx`, `Jargon.tsx`, `Footer.tsx`
- `src/lib/` — `showdown.ts` (types/format), `showdown-pool.json` (352 real videos via vidIQ), `tools.ts` (Garage grid data), `jargon.ts`
- `public/showdown-pairs.json` — **164 baked same-niche pairs** (niche-categorized from the pool; regenerate by re-pairing within niches with an outlier gap)
- `public/sw.js` — service worker (versioned caches `*-ts-v1`; bump VERSION when changing it)
- `public/assets/koi-pond.js?v=2-autohide` — lantern background; `data-auto-hide`/`data-fade-seconds` on `#koi-pond` control the ~16s linger + 3.5s fade + full self-teardown
- `public/t/<slug>/index.html` — the 8 static tools (aligned, drift, read-rate, life-in-weeks, year-in-emoji + 3 coming-soon), served via `rewrites()` in `next.config.ts`; they still use `public/assets/brand.css` + `shared.js` (`window.TS`)

## Infra
- **Email capture (works, verified end-to-end):** form POSTs `{email, company}` to
  `/api/subscribe/` (trailing slash). The route validates server-side (regex, 254 cap,
  JSON-only), drops honeypot fills (`company`), throttles per hashed IP, then inserts
  into Supabase table **`public.subscribers`** (project `kbrhnedyzoljptpdloix`, the
  vault's project) via REST with the **publishable** key (browser-safe; baked fallback
  in the route, overridable via `SUPABASE_URL`/`SUPABASE_ANON_KEY` env). **RLS =
  insert-only for anon** (verified: INSERT 201, SELECT returns `[]`). Duplicates return
  200 (no enumeration). View signups: Supabase dashboard → Table Editor → subscribers.
  **Never** put the service_role/secret key in this app; never read `.env`.
- **Service worker:** caches shell (network-first) + `showdown-pairs.json`
  (stale-while-revalidate) + all ~330 YouTube `mqdefault` thumbnails (cache-first,
  prefetched on idle, skipped on Save-Data/2g). Whole game replays offline within ~1
  min. `/api/*` never cached.
- **CSP (vercel.json):** strict; `connect-src 'self' https://i.ytimg.com` (SW thumbnail
  fetches NEED this), `img-src` allows ytimg, `worker-src 'self'`. Don't loosen further.

## Voice & product rules (owner-set, enforce everywhere)
1. **No em-dashes anywhere** in copy (real third-party YouTube titles in the game data are the one allowed exception).
2. **"10x", not "ten times"** — numerals for multipliers.
3. **Choices: 2 by default, 3 max** ("rule of three"). Hero has 2 doors; Index has 3.
4. Brand = **"Code for Creatives India"**, creatives-primary; wink line "creatives · creators"; audience lists lead with creatives (writers, musicians, designers, comics, journalists, YouTubers). Personal name only where a human speaks ("Hi, I'm Shivam", About signature, trust block) + the faint `svx2027` watermark.
5. Mission canon (keep verbatim): the Sweden/GitHub story and "Give a creator the words, and they cross the bridge on their own." (These deliberately still say "creator", the other half of the duality.)
6. Honest, anti-funnel voice. No tracking, no analytics, no captchas. The email is the single opt-in exception to "nothing leaves your device."

## Gotchas (hard-won, don't re-learn)
- **Headless preview/MCP tabs freeze rAF + CSS transitions**: Framer mount-animations, the koi fade, and screenshots after scroll are unreliable there. Content must never be visibility-gated on a JS mount animation — the `[data-reveal]`/`RevealController` pattern (visible by default, armed only inside `requestAnimationFrame`) exists for this. Verify motion in a real foreground Chrome window.
- JSX collapses the space after inline `<strong>/<em>` before a text line — use `{" "}`.
- `trailingSlash: true` means POST `/api/subscribe` 308-redirects; call `/api/subscribe/`.
- Supabase SQL editor: keep SQL ASCII (smart dashes corrupt), and it's Monaco — set text via `monaco.editor.getModels()[0].setValue(...)` when driving the browser.
- Bump `sw.js` VERSION and the koi-pond `?v=` query when changing those files.
- Deploys go live in ~30s; verify with `curl` against https://shivamvashisth.com (grep for a marker string), and note client-rendered content (game, koi script tag) won't appear in server HTML.

## Current state & open items
Live and verified (light + dark, desktop + mobile): brand, Index nav (X close),
persistent Files pill, Mission band, 2-door hero, same-niche offline Showdown,
email capture storing to Supabase, koi-pond auto-dismissing at ~16s.
**Open items:** (1) the 8 static tool pages still have the old (pre-Next) look —
restyling them to match is the natural next step; (2) vault demo rows may still be
seeded — Shivam uploads real PDFs at files.shivamvashisth.com/admin, then ask to
clear demos; (3) consider moving both repos to the T7 SSD when mounted (ask first).

## How to work with Shivam
Plain English, define jargon, terse and direct, no celebratory language. Small
verifiable phases; after each say what changed and how to tell it worked. He runs in
"auto mode": for THIS project he has granted standing permission to build, verify, and
**deploy (push to main) autonomously** — but verify changes yourself (contrast,
readability, both themes, mobile) before pushing, tag versions so every iteration
stays reachable, and confirm to him after deploying with proof. Never read/print
`.env`; keep RLS on; secrets server-side.
