"use client";

import { useRef, useState } from "react";
import { Reveal } from "./Reveal";

// The mission promises words. This is where they get handed over, verbatim and copyable.
const STARTER_PROMPT = `You are my patient coding teacher. I am a creative person with zero coding experience.

Build me a tiny web app as a single index.html file, with all the styling and code inside that one file. No accounts, no installs, nothing leaving my browser.

The app: [describe your idea in one sentence, for example: a tip jar sign with a QR code for my gigs].

Rules: explain every step in plain English. Define each technical word the first time you use it. Keep it under 200 lines. When it works, tell me how to open it in my browser, how to change the colors myself, and one small upgrade I could try next.`;

const STEPS = [
  {
    k: "01",
    h: "Play one tool",
    body: "Open Life in Weeks up in the Garage. Notice it is one page that does one thing well. That is the whole ambition.",
  },
  {
    k: "02",
    h: "Steal this prompt",
    body: "Copy the starter prompt below and paste it into any AI assistant you already use. Claude, ChatGPT, Gemini, all fine.",
  },
  {
    k: "03",
    h: "Ship it to one person",
    body: "Save the file, open it in your browser, send it to one friend. The moment they use it, you are someone who builds.",
  },
];

export function StartHere() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(STARTER_PROMPT);
    } catch {
      // Older browsers: fall back to a transient textarea selection.
      const ta = document.createElement("textarea");
      ta.value = STARTER_PROMPT;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="start" className="relative z-10 mx-auto max-w-5xl scroll-mt-24 px-5 py-24 sm:px-7 sm:py-32">
      <Reveal className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">Start here</p>
        <h2 className="mx-auto mt-2 max-w-2xl font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Your first words
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-ink-soft">
          The mission says I hand you the words. Here they are. Three steps, no sign-up, tonight if you like.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.k} delay={i * 0.08}>
            <div className="border-t border-line-strong pt-5">
              <span className="font-mono text-sm text-ink-faint">{s.k}</span>
              <h3 className="mt-2 font-display text-xl font-medium text-ink">{s.h}</h3>
              <p className="mt-2 text-sm text-ink-soft">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-12 overflow-hidden rounded-3xl border border-line bg-card shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5 sm:px-6">
            <div className="flex items-center gap-3">
              <span aria-hidden className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-acc-rose/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-acc-peach/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-acc-mint/70" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink-faint">The starter prompt</span>
            </div>
            <button
              type="button"
              onClick={copy}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all active:scale-95 ${
                copied ? "bg-acc-mint text-white" : "bg-ink text-paper hover:-translate-y-0.5"
              }`}
              aria-live="polite"
            >
              {copied ? "Copied. Go build." : "Copy the prompt"}
            </button>
          </div>
          <pre className="max-h-[22rem] overflow-auto whitespace-pre-wrap px-5 py-5 font-mono text-[0.85rem] leading-relaxed text-ink-soft sm:px-6">
            {STARTER_PROMPT}
          </pre>
        </div>
        <p className="mt-3 text-center text-sm text-ink-faint">
          Swap the bracketed line for your own idea. That one sentence is the only part you have to write.
        </p>
      </Reveal>
    </section>
  );
}
