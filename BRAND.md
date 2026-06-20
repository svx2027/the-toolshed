# The Toolshed — brand

Every page inherits `assets/brand.css`. Don't restyle per page; reuse the tokens below.

## Voice
Operator, not engineer. Plain, warm, a little playful. The output is meant to be shared —
the card or link *is* the marketing. Never overpromise; say plainly what a tool can't do.

## Palette
| Token | Hex | Use |
| --- | --- | --- |
| paper | `#FCFCFA` | base background |
| ink | `#1C1B1A` | primary text, primary button |
| ink-soft | `#56524d` | body text |
| ink-faint | `#8b867f` | hints, captions |
| lavender | `#E6E0F2` | wash + creator accent fill |
| peach | `#F8E2D4` | wash + accent fill |
| mint | `#DFF0E6` | wash + "live" accent fill |
| sky | `#DCEAF5` | wash + "everyone" accent fill |
| acc-sky | `#2f6fae` | links, focus ring |
| acc-mint | `#2f8f63` | success / live |
| acc-peach | `#c2693a` | brewing |
| acc-lavender | `#6d5bb0` | creator |
| acc-rose | `#c25274` | playful accent |

Background is a soft pastel-rainbow watercolour wash (four corner blooms) over near-white paper.

## Type
- Display / headings: **Fraunces** (soft elegant serif), weight 500–600.
- Body / UI: **Inter**, 400/500.
- Numbers & code: **JetBrains Mono**, tabular.
- Sentence case everywhere. Two weights only.

## Components (classes in brand.css)
`.wrap` `.card` `.pad` `.btn` `.btn.ghost` `.pill` (`.live` `.brewing` `.everyone` `.creator`)
`.toolnav` `.foot` `.field` `.row` `.eyebrow` `.lead` `.muted` `.mono` `.serif` `.sr-only` `.center`.

## Motion
Gentle, paper-like. Hover lifts cards with a tiny tilt. Confetti only on a micro-toy win or a
share-card export. All motion respects `prefers-reduced-motion`.

## Share cards
One engine: `TS.makeCard({draw, width, height})` in `assets/shared.js`. Default 1080×1920 (IG story).
Always paint `TS.washBackground` (makeCard does it) and end the draw with `TS.watermark`.
Nothing leaves the browser — cards are drawn client-side.
