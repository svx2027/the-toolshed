# The Toolshed — a 2-page guide

*How to access it, how to use it, and how to explain it to someone.*

---

## What it is

**shivamvashisth.com** is your personal site plus a "shed" of tiny web tools. It's static
(just files), free to host, and tracks nothing. **Four tools are live**; three are "brewing"
(coming soon). The signature idea: every tool ends in a **share card** — a screenshot-ready
image you'd actually want to post. The card is the marketing.

---

## 1 · How to access

- **Live site:** https://shivamvashisth.com
- **On your computer (no internet needed):** open the project folder and run
  `python3 -m http.server 8137`, then visit `http://localhost:8137`.
- **Direct tool links** (also reachable from the grid on the homepage):
  - `/t/life-in-weeks/`
  - `/t/read-rate/`
  - `/t/year-in-emoji/`
  - `/t/aligned/`
  - Brewing: `/t/comment-goldmine/` · `/t/outlier-radar/` · `/t/sealed/`

---

## 2 · How to use each tool

**Thumbnail Showdown** (on the homepage) — tap the thumbnail you think got the higher
click-through. Build a streak; *Share my streak* makes a card.

**Life in Weeks** — type your birthday (and, optionally, a life expectancy) → *Draw my life*.
You'll see your life as a grid of weeks with the counts. *Share this card* saves a story image.
Your birthday never leaves the page.

**Read Rate** — *Start the test* → read the short passage → *I'm done reading* → answer the
3 questions → get your words-per-minute and an estimated percentile → *Share my result*.
(The percentile only counts if you get at least 2 of 3 right — no cheating by skimming.)

**Year in Emoji** — pick a year, then for each month tap an emoji and type one word.
*Save card* downloads a Wrapped-style recap. Your entries are saved on your device.

**Aligned** — pick a deck (Couples or Friends) → answer 10 quick questions →
*send the link* to the other person. They answer the same ten (they can't see your answers),
then you both get a "% aligned" score and your biggest clash. *Save the share card* to post it.

---

## 3 · How to explain it to someone (the pitch)

> "It's a little site of tiny tools I make with AI. Each one turns 30 seconds of tapping into
> something you'd actually want to post — your life in weeks, your reading speed, your year in
> emoji, how aligned you and a friend are. The share card it spits out *is* the point: that's
> how the tool travels."

Quick one-liners:
- **Life in Weeks** — "Your whole life as a grid of weeks. Sobering and beautiful."
- **Read Rate** — "Find your real reading speed in 60 seconds."
- **Year in Emoji** — "Your year in twelve emoji and twelve words."
- **Aligned** — "How aligned are you two, really? Send them the link."

---

## 4 · Privacy (what to reassure people)

Everything runs in the browser. Life in Weeks and Year in Emoji never send your data anywhere;
Aligned passes answers only through the share link. No accounts, no analytics, no tracking.

## 5 · Adding a tool later

Copy a folder under `t/`, link `/assets/brand.css` and `/assets/shared.js`, and add one entry
to the `TOOLS` list in `index.html`. The brewing pages are the template for a "coming soon" tool.
