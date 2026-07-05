import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { CopyButton, ShareLinkButton, TrackedDownload } from "./CopyButton";
import { SubscribeBox } from "@/components/SubscribeBox";

// Drop 01 of the SVX2027 prompt series. Prompts live as .md files in /public/prompts so the
// download links and the copy buttons always serve the exact same bytes.
const readPrompt = (file: string) =>
  readFileSync(path.join(process.cwd(), "public", "prompts", file), "utf8");

export const metadata: Metadata = {
  title: "SVX2027 TasteMaxxing: turn your saved reels into a content brain",
  description:
    "Drop 01: paste one prompt into Claude Code and your saved Instagram reels become an Excel content brain with frames, transcripts, audio, and why each reel works. Plus a bonus prompt to find your first Claude Fable 5 project.",
  alternates: { canonical: "/svx2027-tastemaxxing-01/" },
  openGraph: {
    type: "article",
    title: "SVX2027 TasteMaxxing: Drop 01",
    description:
      "Your saved reels are the best record of your taste that exists. One prompt turns them into a content brain.",
    url: "/svx2027-tastemaxxing-01/",
    images: ["/assets/og-home.png"],
  },
};

export default function TasteMaxxing01() {
  const tastemaxxing = readPrompt("svx2027-tastemaxxing-starter-kit.md");
  const fableDiscovery = readPrompt("svx2027-fable-discovery.md");

  return (
    <div className="relative z-10 mx-auto max-w-3xl px-5 pb-20 pt-8 sm:px-8">
      <header className="mb-12 flex items-center justify-between text-sm">
        <Link href="/" className="font-medium text-ink-soft hover:text-ink">
          ← shivamvashisth.com
        </Link>
        <a
          href="https://www.instagram.com/svx2027"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-ink-faint hover:text-ink"
        >
          @svx2027
        </a>
      </header>

      {/* Hero */}
      <section className="mb-10">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-acc-lavender">
          SVX2027 · Drop 01
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          TasteMaxxing
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          You&apos;ve saved hundreds of reels. Be honest: when did you last open that folder?
        </p>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Your saved reels are the most accurate record of your taste that exists. This page gives
          you one prompt: paste it into Claude Code, answer a single question, and your saved reels
          become a <strong className="text-ink">content brain</strong>. An Excel file where every
          reel is a row with its key frames, transcript, audio, numbers, and an AI note on why it
          works and how <em>you</em>{" "}could recreate it. No coding. If you can copy, paste, and
          click &ldquo;Allow&rdquo;, you&apos;re qualified.
        </p>
      </section>

      {/* Phone notice */}
      <section className="mb-10 rounded-2xl bg-sky/60 p-5 dark:bg-card">
        <p className="text-sm leading-relaxed text-ink-soft">
          <strong className="text-ink">On your phone right now?</strong>{" "}This runs on your
          computer (that&apos;s where Claude Code lives). Send yourself this page and pick it up
          there. Everything below will be waiting.
        </p>
        <div className="mt-3">
          <ShareLinkButton />
        </div>
      </section>

      {/* Before you start — the human setup, kept off the prompt so the paste is pure instructions */}
      <section className="mb-10">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-ink-faint">
          Before you paste · about 5 minutes, once
        </p>
        <h2 className="font-display text-2xl font-semibold text-ink">Three small things</h2>
        <div className="mt-5 space-y-4">
          <div className="rounded-2xl border border-line bg-card p-5">
            <h3 className="font-display text-lg font-medium text-ink">1 · Get Claude Code</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">
              Sign up at{" "}
              <a className="text-acc-sky underline-offset-2 hover:underline" href="https://claude.ai" target="_blank" rel="noopener noreferrer">claude.ai</a>{" "}
              on a paid plan (Pro or Max), then download{" "}
              <a className="text-acc-sky underline-offset-2 hover:underline" href="https://claude.com/claude-code" target="_blank" rel="noopener noreferrer">Claude Code</a>{" "}
              and sign in. On Windows, if it asks for &ldquo;Git for Windows&rdquo;, install that too and keep clicking Next.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-card p-5">
            <h3 className="font-display text-lg font-medium text-ink">2 · Connect Instagram (the magic ingredient)</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">
              Open <strong className="text-ink">Google Chrome</strong>, log in at instagram.com, and install the{" "}
              <strong className="text-ink">Claude in Chrome</strong> extension (publisher must say Anthropic). It only ever
              reads your saved reels, and you watch it work. No extension on your plan? Paste anyway; Claude has two other
              easy ways in.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-card p-5">
            <h3 className="font-display text-lg font-medium text-ink">3 · Paste &amp; go</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">
              Start a new chat in Claude Code, hit the copy button below, paste, and press Enter. Answer one question,
              then everything runs on its own. You approve each step; your Instagram stays 100% read-only.
            </p>
          </div>
        </div>
      </section>

      {/* Prompt 01 */}
      <section className="mb-10 rounded-2xl border border-line bg-card p-6 shadow-sm sm:p-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-acc-mint">
          Prompt 01 · the main event
        </p>
        <h2 className="font-display text-2xl font-semibold text-ink">
          The TasteMaxxing Starter Kit
        </h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-soft">
          <li>• Claude sets everything up for you, step by step. You approve each action.</li>
          <li>
            • One question, then auto mode: your first Excel vault usually lands within the hour
            (a brand-new computer can add a one-time tools install, and Claude warns you first).
          </li>
          <li>• Your Instagram stays 100% read-only. Nothing is liked, posted, or changed.</li>
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-3" id="download-fallback">
          <CopyButton text={tastemaxxing} label="Copy the full prompt" event="copy_starter" />
          <TrackedDownload
            href="/prompts/svx2027-tastemaxxing-starter-kit.md"
            download="SVX2027-TasteMaxxing-Starter-Kit.md"
            event="download_starter"
            className="inline-flex items-center rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
          >
            Download .md
          </TrackedDownload>
        </div>
        <p className="mt-4 text-xs text-ink-faint">
          One tap copies the whole prompt. It&apos;s pure instructions, nothing to trim, so paste it
          straight into a new Claude Code chat.
        </p>
        <details className="mt-5">
          <summary className="cursor-pointer text-sm font-medium text-acc-sky">
            Peek inside the prompt
          </summary>
          <pre className="mt-3 max-h-96 overflow-auto rounded-xl border border-line bg-paper p-4 font-mono text-xs leading-relaxed text-ink-soft whitespace-pre-wrap">
            {tastemaxxing}
          </pre>
        </details>
      </section>

      {/* How it works */}
      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold text-ink">How it works</h2>
        <ol className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
          <li>
            <strong className="text-ink">1 · Set up, then paste.</strong> Do the three small
            things above (Claude Code, the Chrome extension), then copy the prompt and paste it
            into a new Claude Code chat. Missed a step? Claude catches it and walks you through two
            other ways in.
          </li>
          <li>
            <strong className="text-ink">2 · Answer one question.</strong>{" "}&ldquo;What do you
            create?&rdquo; One line, or just type <span className="font-mono">go</span>.
          </li>
          <li>
            <strong className="text-ink">3 · Watch.</strong> Claude finds your saved collections,
            processes your reels, and opens your first vault: images embedded, taste analysis
            included. Tag <a className="text-acc-sky" href="https://www.instagram.com/svx2027" target="_blank" rel="noopener noreferrer">@svx2027</a> when it opens. I want to see it.
          </li>
        </ol>
      </section>

      {/* Bonus prompt */}
      <section className="mb-12 rounded-2xl border border-line bg-card p-6 shadow-sm sm:p-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-acc-peach">
          Bonus · Claude Fable 5
        </p>
        <h2 className="font-display text-2xl font-semibold text-ink">
          Trying to figure out where to start with Fable?
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          Use this discovery prompt to find Fable-worthy work in your own projects and
          conversations, and send us the results: DM your top 3 to{" "}
          <a className="text-acc-sky" href="https://www.instagram.com/svx2027" target="_blank" rel="noopener noreferrer">
            @svx2027
          </a>{" "}
          and favorites get run live on the next stream. You don&apos;t need Fable to run the
          discovery itself; any Claude works, so open Claude (app, web, or Code), paste, answer one
          question.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <CopyButton text={fableDiscovery} label="Copy the bonus prompt" event="copy_fable" />
          <TrackedDownload
            href="/prompts/svx2027-fable-discovery.md"
            download="SVX2027-Fable-Discovery.md"
            event="download_fable"
            className="inline-flex items-center rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
          >
            Download .md
          </TrackedDownload>
        </div>
        <details className="mt-5">
          <summary className="cursor-pointer text-sm font-medium text-acc-sky">
            Peek inside the prompt
          </summary>
          <pre className="mt-3 max-h-96 overflow-auto rounded-xl border border-line bg-paper p-4 font-mono text-xs leading-relaxed text-ink-soft whitespace-pre-wrap">
            {fableDiscovery}
          </pre>
        </details>
      </section>

      <SubscribeBox />

      <footer className="border-t border-line pt-6 text-sm text-ink-faint">
        <p>
          SVX2027 is a series; this is drop 01. Built by{" "}
          <a className="text-acc-sky" href="https://www.instagram.com/svx2027" target="_blank" rel="noopener noreferrer">
            Shivam Vashisth
          </a>{" "}
          after 1,000+ reels of trial and error, so your run just works.
        </p>
      </footer>
    </div>
  );
}
