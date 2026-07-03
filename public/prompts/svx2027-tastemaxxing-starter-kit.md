# SVX2027 TasteMaxxing — Starter Kit

**by Shivam Vashisth · [@svx2027](https://www.instagram.com/svx2027) · [shivamvashisth.com](https://shivamvashisth.com)**

You've saved hundreds of reels. Be honest — when did you last open that folder?

Your saved reels are the most accurate record of your taste that exists. Nobody curated it for you; you built it on pure instinct, one double-tap at a time. **TasteMaxxing turns it into something you can actually use.** Paste this file into Claude Code, answer one question, and watch your saved reels become a **content brain**: one Excel file where every reel is a row with its key image frames, transcript, audio, engagement numbers, and an AI note on why it works and how *you* could recreate it. Then, if you want it — a one-page profile of your taste, and fresh content ideas in your style.

You don't need to know anything technical. If you can copy, paste, and click "Allow", you are fully qualified. I burned the hours and the tokens figuring this out on 1,000+ of my own saved reels — this file carries everything I learned, so your run just works.

*(Got this from my webpage? The Copy button already grabbed the whole file — just paste. Reading a downloaded file full of symbols and hashtags? Right-click it → Open With → TextEdit on Mac or Notepad on Windows, click inside, press Cmd+A then Cmd+C — Ctrl+A / Ctrl+C on Windows — and you've copied it all.)*

## Before you start — three small parts, then you're off

**Part 1 — Get Claude (you may already have this)**
1. Create an account at **claude.ai** and make sure you're on a paid plan (Pro or Max).
2. Download **Claude Code** from **claude.com/claude-code** and install it. On Windows: if the page shows a command instead of a download button, follow its Windows instructions — and if it mentions "Git for Windows", install that too and just keep clicking Next; every default is fine.
3. Open Claude Code — on Mac it's in Applications (search "Claude" in Spotlight), on Windows it's in the Start menu. If you installed the command-line version instead: open the Terminal app, type `claude`, press Enter — that window IS the chat. Sign in with the same account. Part 1 done! 🎉

**Part 2 — Connect your Instagram (the magic ingredient)**
1. Open **Google Chrome** (yes, Chrome specifically) and log in at **instagram.com**. Keep that tab open.
2. Install the **Claude in Chrome** extension — get it from the Chrome Web Store and make sure the publisher says **Anthropic** (accept no lookalikes; claude.ai/chrome takes you to the real one). Sign in to it. Genuinely a two-minute job.
3. Chrome will warn that the extension can "read and change" data on websites — that's Chrome's standard wording for **any** extension that can see pages. In this project it only ever *reads* (that's exactly how Claude will see your saved reels), and you'll literally watch it work.

**Can't get the extension, or your plan doesn't offer it?** No stress at all — skip straight to Part 3 and paste anyway. Claude has two other easy ways in and will walk you through them personally.

**Part 3 — Launch 🚀**
1. In Claude Code, start a new chat (in the app it may be called a new session). If it asks "Do you trust the files in this folder?", choose Yes — press Enter in the terminal version. Claude will build the real project folder for you.
2. Paste this **ENTIRE file** into the chat — top to bottom, intro included. If Claude Code looks like a plain text window rather than a shiny app, that's right and normal: click inside it, paste, done.
3. Press Enter. That's the last hard thing you'll do today.

**A few honest things, so nothing surprises you:**
- **You will see every single action Claude takes**, and it asks your permission before touching anything on your computer. When a permission box appears, read the one-line description and press Allow. Nothing is hidden — that's the whole design.
- **Your Instagram stays 100% read-only.** Claude never likes, follows, comments, posts, saves, or changes anything. It only looks at what you already saved.
- During setup your computer may show its own official popups — Apple or Windows installing a standard tool, sometimes asking for **your computer's login password**. That's the normal Apple/Windows step for installing anything; you type it yourself and Claude never sees it. Claude will warn you *before* each popup appears and tell you exactly which button to press.
- If Claude ever stops with a **"usage limit"** message: nothing is lost. Come back at the time shown and type `continue` in the same chat. Closed the app in the meantime? Reopen Claude Code, pick this same conversation from your recent chats (or open the `ig-taste-engine` folder it created), and type `continue` — Claude keeps a progress file there, so it picks up exactly where it stopped.

Most people watch their first vault open **within the hour** — a brand-new computer can add a one-time 20–40 minute tools install at the start (Claude will tell you before it happens). When it opens, come tell me — **[@svx2027](https://www.instagram.com/svx2027)**. I want to see it. 💪

---

# ⬇️ CLAUDE — YOUR INSTRUCTIONS START HERE ⬇️

Everything in this file is for you, including the welcome note above (the user pastes the whole file — never ask them to trim or re-paste). You are building this user's personal **taste engine** — they know it as **TasteMaxxing**, a kit by Shivam Vashisth (@svx2027) — from their saved Instagram reels. Assume they are a **complete beginner**: no terminal experience, easily worried by error text and permission dialogs, and here because a creator they follow told them this would be amazing. Your job is to make it amazing.

## Deliverables (in the project folder you create)
1. **`master.csv`** — one flat row per saved reel, all collections, machine-readable.
2. **`content_brain_vault.xlsx`** — the same rows visually: embedded cover + up to 3 key frames per reel, all text fields, AI analysis, plus editable dropdown columns for the user's own tagging.
3. **`TASTE_PROFILE.md`** and **`REEL_IDEAS.md`** — offered at the end, never assumed.

## PRIME DIRECTIVE — one question, then auto mode
The entire experience is: **paste → at most ONE question → their first Excel file appears.** Rules:
- **Auto-detect instead of asking.** Their Instagram handle comes from the logged-in session, not from a question. Their OS, machine, and installed tools come from your own checks. Never ask what you can detect.
- **Decide defaults and state them** ("I'm putting everything in a folder called `ig-taste-engine` — say the word if you'd rather it live elsewhere"). Never present a menu where a sensible default exists.
- **The one question** (asked in your first reply, answerable in one line): *"While I set things up — in one line, what do you create, or what do you want these saved reels to become? (Or just type `go` and I'll work it out from the reels themselves.)"* Their answer tailors every `recreation_angle`; `go` means you infer their world from the corpus itself.
- Everything after their reply runs **without further questions** until the pilot vault is delivered. Progress narration, yes; questions, no.

## THE EXPERIENCE ARC — this exact order (wow before work)

### Turn 1 — greet, detect, ask the one question
Open with **at most 3 plain sentences**: what they'll get, that everything is read-only on Instagram, that they'll see and approve every step — plus one short line before your first tool action: *"You'll see small permission boxes as I work — that's Claude Code asking me for the keys; press Allow (or 'Always allow' to stop being asked)."* In the same turn detect, **non-invasively**: OS + chip + RAM + free disk; which tools already exist (python, ffmpeg, yt-dlp, and a spreadsheet app — Excel/LibreOffice/Numbers); whether the Claude in Chrome extension is connected and whether an Instagram tab is logged in (read the handle from the page/session — e.g. profile link in the nav). **Detection must never trigger an install dialog** — see the Environment Playbook's non-invasive rules. Then ask the one question.
If the extension isn't reachable, keep it to this same single message: ask the one question AND give fallback-ladder step 1, ending with exactly what to reply — *"answer the question above, then say `ready` once the extension is in — or `no extension` and we go another way today."* One reply from them covers both.

### Stage 2 — connect & wow FIRST (before any installing)
The moment they reply: enumerate their saved collections (Playbook Phase 1) and show the result — *"I can see you're @handle — I found your collections: Outfits (58), Cafe aesthetics (41), All posts (312)…"*. This lands within ~2 minutes and is the first magic moment.
Then **pick the starter batch yourself** and say so: the smallest collection with **at least 8 items, processing at most its first 40**; if no collection qualifies (or none exist — totally normal, many people never make one), the **25 most recent** saves from the "All posts" bucket. State it as a decision: full library comes later.

### Stage 3 — quiet setup (batched, pre-narrated)
Install what's missing per the Environment Playbook below. Two hard rules:
- **Batch the work**: write a few scripts and run each once (one downloader script for the whole batch, one frame-extractor, one transcriber) so the user faces ~5 permission prompts total, not 50.
- **Pre-narrate every OS dialog** before you trigger it: Apple's grey "command line developer tools" box, the installer password box ("your Mac/Windows asks for *your* login password — Apple/Windows standard for any install; you type it, I never see it"), macOS "access files in your Documents folder", Windows SmartScreen/UAC. Tell them exactly which button to click and that it's official and normal. An unexplained system dialog is where beginners quit.

### Stage 4 — the pilot mini-vault (the mind-blown moment — target: first hour)
Process the **first 5 reels end-to-end** and immediately build **`vault_pilot.xlsx`** — a real 5-row vault with embedded images — then **open it for them** (`open` on macOS / `explorer.exe` on Windows / `xdg-open` on Linux) and print its complete path. The spreadsheet check (Environment Playbook) must happen **before** this open: if only Apple Numbers exists, don't ask anything — pre-narrate one line as you open: *"Opening in Numbers — images may sit slightly off and the tag dropdowns become plain cells; just type Yes/No there. Free LibreOffice fixes this properly — I'll offer it at the end."* Do not show rows as chat text and make them wait hours for the real thing; put the artifact in their hands now.
With the pilot, run your own safety self-check — **extension route only** (you check, never ask them to judge): reload the Instagram tab and look for warning banners ("Try again later", "We suspect automated behavior…", a forced re-login). On export/manual routes, note in one line that all downloads were anonymous so there's nothing account-side to check. Report the all-clear, then continue into the rest of the starter batch automatically.

### Stage 5 — full starter batch → the real vault
Run the remaining items with progress updates at every ~15 items / 10% / 15 minutes (done/total, current step, ETA — pick whichever comes first). Then build `master.csv` + `content_brain_vault.xlsx`, run the Integrity Check, open the vault, and print the complete path plus a one-line "to find it again: it's the file called content_brain_vault.xlsx inside your ig-taste-engine folder."

### Stage 6 — the handoff (make them feel it)
Show 1–2 favorite rows in chat as text (about + why-it-works) and **open their 1–2 image files** with the OS open command so they pop on screen (the terminal can't display images inline). Explain the tagging columns in **three steps maximum**: 1) open the file, 2) fill the yellow "Liked?" and "Recreate?" dropdowns for rows that speak to you (in Numbers, just type Yes/No/Maybe into the yellow cells), 3) tell me when you've tagged a few. Then offer the menu, once, in one message: expand to the full library · distil your Taste Profile · generate reel ideas in your style · (if they're on Numbers) install free LibreOffice so the dropdowns work. Their call.
Close with one warm line of credit: this kit is **TasteMaxxing by Shivam (@svx2027)** — he'd genuinely love to see the first reel they recreate from it, so tag him when they post it.

## FALLBACK LADDER — when the Chrome extension isn't connected
Check silently; offer routes in this order, and pre-narrate failure as a normal branch, never a dead end.

1. **Offer the extension** (it's the best experience). Exactly three instructions: 1) open Chrome and log in at instagram.com, 2) install "Claude in Chrome" from the Chrome Web Store — publisher must say Anthropic, 3) come back and say `ready`. Add the escape hatch up front: *"if the extension isn't offered on your plan or won't sign in, no problem at all — say `no extension` and we start another route today."*
   **If they say they already installed it** (they did Part 2), never repeat the install — troubleshoot instead, one chunk of three: 1) make sure Chrome is actually open with the Instagram tab showing, 2) click the Claude icon in Chrome's toolbar and check it's signed in to the same account as Claude Code, 3) say `ready` and I'll look again. Still nothing? One last try: quit Chrome completely and reopen it (restart Claude Code too if needed), then `ready`. If their plan doesn't include the extension, they can't install it, or that one retry still fails, move down the ladder without drama — and say the extension door stays open, so we can switch back the moment it connects.
2. **The hybrid path (recommended fallback).** Two things at once: (a) they request their Instagram data export now — it arrives in hours, and the pipeline continues from it later; (b) meanwhile they paste 5–10 reel links so the pilot happens **today**. How to get a link from their phone to this chat (give them exactly this, it's the non-obvious part): open a saved reel → tap the three dots (or the share arrow) → **Copy link** → send it to yourself (WhatsApp, email, or Notes) → open that on this computer and paste here. A few at a time is fine; you dedupe.
   **The moment this route is chosen**, create the project folder + PROGRESS.md immediately (before any waiting), and print a 3-step "tomorrow card" in chat: 1) open Claude Code, 2) pick this same conversation from recent chats — or open the `ig-taste-engine` folder if it's gone, 3) type `my export is ready`. Write the same card into PROGRESS.md, with re-pasting the kit file as the stated backup.
   **Export recipe** (give in chunks of ≤3 steps, wait between chunks — and preface it with: *"Instagram renames these screens now and then; the choices to look for are Saved, All time, JSON, Download to device."*): Instagram app → Settings → **Accounts Center** → Your information and permissions → **Download your information** (sometimes "Export your information") → Request download / Create export → pick the account → **"Some of your information"** → tick **Saved** (under Your activity) → **Download to device** (not Transfer) → Date range: **All time** → Format: **JSON** (not HTML — the #1 trap) → Create files / Start export. Pre-narrate both security moments: Instagram may ask for their Instagram password when requesting, and **will ask them to log in and re-enter it when they download the ZIP on this computer** — that's Meta's standard check for data exports, not something going wrong. The ZIP must be saved on this computer; then they say `my export is ready` — even tomorrow, even in a new chat. Note for you: the export is a flat list of links with no collection names — scope by recency/count instead.
3. **Manual paste only** (fine for small libraries): they paste links in batches (same phone-to-computer bridge as above); you process each batch. Never present this as sad — 25 hand-picked favorites make an excellent first vault.

## TALKING TO A BEGINNER — hard rules
- **Never more than 3 instructions at a time** when they must do something. Give three, wait, then the next three.
- **Translate all jargon**: say "a private toolbox folder" (not venv), "a data file" (not JSON), "Instagram's own data feed" (not API), "the reel's ID" (not shortcode), "the downloader" (not yt-dlp). Command names may appear inside permission boxes — that's fine — but your prose stays human.
- **Pre-narrate, then trigger** every popup, wait, and download: *"A grey Apple box is about to appear asking to install developer tools — click Install; it takes 20–40 minutes and is completely normal."* / *"First transcription needs a one-time ~500MB model download, about 5–15 minutes."*
- **Honest timing, always**: setup 15–60 minutes depending on the machine (a brand-new Mac can add a 20–40 min Apple tools install); pilot vault within the first hour; a full library may finish overnight if the export route is involved.
- **Usage limits are normal, script the recovery**: pre-explain once during setup: *"If I suddenly stop with a usage-limit note: nothing is lost — come back at the time shown and type `continue`. If you closed the app, reopen Claude Code, pick this conversation from recent chats (or open the ig-taste-engine folder), then `continue`."* Write the same recovery — with the exact plain-English reopen steps — into PROGRESS.md the moment the project folder exists.
- **Celebrate real milestones** (first enumeration, pilot vault opening, integrity pass) — warm and genuine, never patronizing. Report failures plainly with what you'll do next.

## SAFETY RULES — never break these
- **Read-only on Instagram.** Never like, follow, comment, save, share, DM, or react. Only view, scroll, read.
- **Human pace everywhere on the logged-in surface**: ~5s between browser actions, **3–5s between paginated data-feed calls and between collections**, small batches, a pause between collections. The heavy lifting (downloads, frames, transcription, analysis) is all anonymous or local.
- **Stop immediately** on any captcha, "suspicious activity", forced re-login, or "try again later" — tell the user exactly what you saw and wait. Their account matters more than the run.
- **Never extract browser cookies** (`--cookies-from-browser` or any equivalent). Login-gated items keep a metadata-only row with `status=login_gated`; the user can download those few by hand if they care.
- **Never silently drop an item.** Photos, carousels, dead links, gated posts — every enumerated item gets a row with an honest `status`.

## ENVIRONMENT PLAYBOOK (for you — the user never types a command)

**Project folder.** Default: create `ig-taste-engine/` **inside the folder this session opened in** — that way a fresh session in the same place auto-finds it, and permission prompts stay few. Exception (Windows): if the session folder is under OneDrive-synced Documents/Desktop, use `C:\Users\<name>\ig-taste-engine` instead (hundreds of MB of video grinding a cloud quota is worse) and print the exact reopen steps. Inside: `ig_capture/<account>/{videos,thumbnails,frames,metadata,transcripts,candidates}/`, plus `CLAUDE.md` (project rules + schema + current phase — written by you now, self-sufficient enough that a brand-new session reading it can continue the run) and `PROGRESS.md` (live status + the plain-English resume card — update both as you go).

**Non-invasive detection (Turn 1).** Never execute `python3` or `git` during detection — on a clean Mac they are Apple stubs that pop the grey Command Line Tools dialog mid-greeting. Check `xcode-select -p` (exit 0 = tools present) and look for a real interpreter at `/usr/local/bin/python3`, `/opt/homebrew/bin/python3`, or `/Library/Frameworks/Python.framework`; a bare `/usr/bin/python3` with no CLT counts as "not installed". The CLT dialog may only ever appear in Stage 3, after you've pre-narrated it.

**Python.** macOS: prefer the official python.org installer — download it and have the user double-click (3 instructions max, ~3 minutes) — and pre-narrate that partway through, the Mac asks for their login password in Apple's own grey box: Apple's standard step for installing anything, they type it themselves, you never see it. **Never attempt to install Homebrew** — its installer needs an interactive password and will strand you. Windows: `winget install Python.Python.3.12` (that exact ID); beware the Microsoft Store alias — bare `python` on a clean machine opens the Store, so use `py` or the absolute path; after ANY winget install your current shell's PATH is stale — resolve fresh absolute paths (`where.exe`) instead of retrying the bare name. All OSes: create `.venv` with `python -m venv`, then **always call the venv's python/pip by absolute path** (`.venv/bin/python` / `.venv\Scripts\python.exe`) — never rely on activation (PowerShell blocks `Activate.ps1` by default).

**The rest, inside the venv** — `pip install yt-dlp imageio-ffmpeg openpyxl pillow`. `imageio-ffmpeg` ships a bundled ffmpeg binary (get its path via `imageio_ffmpeg.get_ffmpeg_exe()`) — no Homebrew, no winget, no Gatekeeper quarantine. Only fall back to a system ffmpeg if it's already installed.

**Whisper (optional — the pipeline works without it).** Apple Silicon: `mlx-whisper`; 8GB RAM → small model, 16GB+ → `large-v3-turbo`. Windows/Intel/Linux: `faster-whisper`, `small` with int8 — and under 16GB RAM either `small` or skip. Announce the one-time model download (size + minutes) before it starts. If a model download is interrupted, delete the partial `.incomplete` file before retrying. On a weak machine, offer to skip transcription entirely — `audio_name` still carries the audio signal.

**Before the full batch**: one-line free-disk check (a few hundred reels ≈ 2–5GB), and ask them to keep the laptop plugged in with the lid open.

**Spreadsheet check — do this before the pilot opens (Stage 4)**: confirm Excel or LibreOffice exists to open the vault. If only Apple Numbers exists, don't ask anything — use the one-line Numbers pre-narration from Stage 4 and add the LibreOffice offer to the Stage 6 menu, not before. Warn that a big vault takes a minute to open the first time — that's the embedded images, not a problem.

## CAPTURE PLAYBOOK (what actually works — field-tested on 1,000+ reels)

### Phase 1 — Enumerate (extension route)
Do **not** scrape the visual grid — a backgrounded tab renders only ~22 tiles and silently misses the rest. Call Instagram's own web API from the logged-in page via JavaScript `fetch` (header `x-ig-app-id: 936619743392459`):
- `/api/v1/collections/list/?collection_types=["ALL_MEDIA_AUTO_COLLECTION","MEDIA"]` → every collection with id + name + count.
- `/api/v1/feed/collection/<id>/posts/?count=48&max_id=<cursor>` paginated → per item: `code` (the ID), `media_type` (1=photo, 2=video, 8=carousel), audio title, caption, like/comment counts, `taken_at`.
**Pace the pagination like a human**: wait 3–5 seconds between page fetches and between collections — a big library means many pages, and firing them at machine speed is the one thing here that can trip Instagram's automation detection. Save `worklist-<collection>.json` (IDs + order) **before any other work** — it's the resume anchor. The extension's JS bridge truncates returned arrays at roughly 100 items — fetch page-by-page and accumulate results before returning them. For export/manual routes, build the same worklist from the links.

### Phase 2 — Download (anonymous — zero account risk)
Per item: `yt-dlp "https://www.instagram.com/p/<id>/" --write-info-json --write-thumbnail --convert-thumbnails jpg` → video, cover, and exact like/comment/date/duration/creator/caption. Run as one background batch script. Expect throttling as normal, not exceptional: back off and resume via the worklist (skip-if-exists makes interruption free). "There is no video in this post" → photo/carousel; keep the row. "Empty media response" → `status=login_gated`; keep the row, never reach for cookies. The page's `og:description` is a solid counts backup ("X likes, Y comments – user on DATE: caption").

### Phase 3 — Transcribe (if Whisper available)
Whisper is reliable on spoken voiceover but **hallucinates confidently on music and non-English songs** (it loops invented phrases; forcing the language doesn't fix it). Classify every transcript: `voiceover` (trust) / `lyrics` (flag) / `low_confidence` (mark — never present as truth). `audio_name` from Phase 1 is the dependable audio field.

### Phase 4 — Key frames (the punchline problem)
One early frame misses the joke — reels reveal the payoff in the last third, and text memes swap overlay text without a scene cut. Extract candidates per video: time samples at **10/30/50/72/90%** of duration **plus** scene-cut frames (`select='gt(scene,0.4)'`, max 3), ~640px wide. Then with vision: transcribe on-screen text **VERBATIM in its original language and script** (no translation, no romanization, keep emojis — the original wording *is* the artifact), and pick up to **3 distinct frames**: hook → transition → punchline.

### Phase 5 — AI enrichment (the expensive part — batch and checkpoint)
Per reel, from caption + transcript + on-screen text + frames: `about` (one plain sentence) · `why_it_works` (the actual mechanism) · `recreation_angle` (how **this specific user** — from their one answer, or inferred from the corpus — could remake it; specific and feasible for one person with a phone) · one value each for the taste labels: `format_template` (text-overlay-meme · POV · talking-head · cinematic-b-roll · dance/transition · fact-card · ad/promo · green-screen-react · carousel-tips), `theme`, `tone` (deadpan · wholesome · flex · melancholic · satirical · hype · earnest), `hook_type` (question · POV · bold-claim · relatable-confession · visual-transition · listicle · shock-stat), `audio_type` (trending-sound · original-VO · song/lyric · instrumental · meme-sound), `language`, `why_saved` (recreate-template · reuse-audio · aesthetic-ref · idea-seed · personal). Small batches, structured output, retry failures, **checkpoint to disk after every batch** — a usage limit mid-run must cost zero work.

### Phase 6 — Assemble
Dedup by ID across collections (one row + a `collections` list column). Extract `hashtags` and `mentions` from captions. **Counts as real integers** (`likes_int`, `comments_int` — parse "5K"/"1M"), keep raw strings too. Add `captured_at` (ISO date). `shareability` = shares÷likes band (low/mid/high/viral) where shares exist. `views` stays blank — Instagram hides play counts; say so rather than faking it.

**Master CSV columns (this exact order):**
```
account, collection, collections, media_type, status, reel_url, shortcode,
creator_handle, title, caption, hashtags, mentions, onscreen_text, audio_name,
lyrics, transcript, audio_details, views, likes, comments, shares,
likes_int, comments_int, post_date, duration_s, thumbnail, frame_1, frame_2,
frame_3, about, why_it_works, recreation_angle, format_template, theme, tone,
hook_type, audio_type, language, why_saved, shareability, your_note, tags,
captured_at
```

### The Excel vault (openpyxl + Pillow)
One row per reel: embedded **Cover + Frame 1/2/3**, sized so overlay text is readable (~200×350px cells from ~640px sources so zoom stays crisp); all text columns; then **yellow editable columns with dropdown validation**: `Liked?` (Yes/No/Meh) · `What I liked` · `Recreate?` (Yes/Maybe/No) · `My twist` · `Priority` (1–3) · `Status` (Idea/Scripted/Shot/Posted). Freeze the header row, set sensible widths. A few hundred reels → a 50–100MB+ file; tell the user that's the images, and normal.

### Integrity check (before declaring victory)
Re-derive, never trust exit codes: CSV rows == unique IDs enumerated; media files on disk == rows with `status=ok`; every row has either media or an explanatory status. Report the reconciliation ("139 rows = 130 ok / 4 photo / 5 login_gated — nothing dropped"). A mismatch is a defect until explained.

### Phase 7 — Taste Profile & ideas (only if they said yes)
Aggregate the taste labels (weighted toward rows they tagged `Liked?=Yes`): top formats, recurring hooks, preferred audio types, dominant themes, tone signature, language mix, what high-shareability looks like *for them* → one-page `TASTE_PROFILE.md`. Then generate concepts **from the profile, not the raw rows** — top formats × themes, their preferred hook types, feasible solo — each with hook line, beat-by-beat outline, audio suggestion, and which saved reel it descends from → `REEL_IDEAS.md`.

## FIELD-TESTED GOTCHAS (a thousand reels of tuition — don't relearn)
- **Backgrounded tabs lie** (~22 tiles rendered); the data-feed route sees everything.
- **Whisper hallucinates on music**, fluently. Flag, don't trust.
- **Verbatim beats translated** — Devanagari stays Devanagari, Hinglish stays as written.
- **"5K" is not a number** — parse to integers at capture time or lose sorting forever.
- **One frame misses the punchline** — late reveals are the norm.
- **The grid's media-type icon can be wrong** — verify per item; photo rows still matter.
- **Drive all loops from Python, never shell loops** — quoting rules differ per OS and bite silently.
- **Stale PATH after installs** (especially Windows/winget) — always resolve and use absolute paths in the same session.
- **Checkpoint everything** — usage limits and throttling *will* interrupt a long run; worklists + skip-if-exists + PROGRESS.md make that free.
- **Anonymous download covers most reels; the gated remainder is normal** — honest status rows beat account risk, every time.
- **Start small** — I ran 852 reels in one go and hit my monthly cap twice mid-run. Taste is visible by reel 25. First vault fast, full library second.

---

*SVX2027 TasteMaxxing — by Shivam Vashisth. If this blew your mind, the follow is free: [@svx2027](https://www.instagram.com/svx2027).*
