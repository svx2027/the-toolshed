"use client";

import { useRef, useState } from "react";

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
    <section id="start" className="scroll-mt-28 border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="t-kicker">Start here</p>
        <h2 className="t-h2 mt-4 text-[clamp(40px,6.5vw,80px)] text-ink">Your first words</h2>
        <p className="mt-5 max-w-2xl text-[17px] text-ink-soft">
          The mission says I hand you the words. Here they are. Three steps, no sign-up, tonight if you like.
        </p>

        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.k} className="bg-card p-6">
              <span className="font-mono text-[12px] text-ink-faint">{s.k}</span>
              <h3 className="t-h3 mt-3 text-[26px] text-ink">{s.h}</h3>
              <p className="mt-2 text-[15px] text-ink-soft">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 border border-line bg-card">
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
            <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-faint">The starter prompt</span>
            <button
              type="button"
              onClick={copy}
              className={copied ? "btn !bg-win !text-white" : "btn"}
              aria-live="polite"
            >
              {copied ? "Copied. Go build." : "Copy the prompt"}
            </button>
          </div>
          <pre className="overflow-x-auto whitespace-pre-wrap px-4 py-5 font-mono text-[14px] leading-relaxed text-ink">
            {STARTER_PROMPT}
          </pre>
        </div>
        <p className="mt-4 text-[14px] text-ink-faint">
          Swap the bracketed line for your own idea. That one sentence is the only part you have to write.
        </p>
      </div>
    </section>
  );
}
