"use client";

import { useState } from "react";
import { track } from "@/lib/track";

const TOPMATE = "https://topmate.io/shivamvashisth";
const PORTFOLIO = "https://yt.shivamvashisth.com/";
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Proof marks already public on yt.shivamvashisth.com and the case studies. Ratios and counts only, no client names.
const PROOF = [
  { v: "Best year", l: "Took a channel past its best-ever year with the same editing and design team as the year before." },
  { v: "384", l: "Videos re-optimised on a live channel without breaking one." },
  { v: "40+", l: "Channels scanned every day by a script I wrote, before a human opens the first one." },
];

type Status = "idle" | "sending" | "done" | "error";

export function WorkWithMe() {
  const [email, setEmail] = useState("");
  const [channel, setChannel] = useState("");
  const [note, setNote] = useState("");
  const [company, setCompany] = useState(""); // honeypot: real people never see this
  const [status, setStatus] = useState<Status>("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = email.trim();
    if (!v || !EMAIL_RE.test(v)) return;
    // The portfolio opens inside the tap itself; a browser blocks a new tab opened after a network wait.
    window.open(PORTFOLIO, "_blank", "noopener,noreferrer");
    setStatus("sending");
    track("work_form");
    fetch("/api/lead/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: v, channel: channel.trim(), note: note.trim(), company }),
    })
      .then((r) => setStatus(r.ok ? "done" : "error"))
      .catch(() => setStatus("error"));
  };

  const mailto =
    "mailto:vashisthshivam00@gmail.com?subject=" +
    encodeURIComponent("Work with me") +
    "&body=" +
    encodeURIComponent(`Channel: ${channel.trim() || "(link)"}\nWhat I want it to do: ${note.trim() || "(one line)"}\n`);

  return (
    <section id="work" className="scroll-mt-28 border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="t-kicker">Work with me</p>
        <h2 className="t-h2 mt-4 max-w-[14ch] text-[clamp(40px,6.5vw,80px)] text-ink">Your channel, past its best year.</h2>
        <p className="mt-5 max-w-2xl text-[19px] leading-relaxed text-ink">
          I take YouTube channels past their best year. Calendar, packaging, numbers, and I build the tools myself.
        </p>

        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
          {PROOF.map((p) => (
            <div key={p.v} className="bg-card p-6">
              <p className="t-num text-[40px] text-acc">{p.v}</p>
              <p className="mt-2 text-[15px] text-ink-soft">{p.l}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-[17px] text-ink-soft">
          It starts with a paid trial week, and you judge me on it. Two ways to begin:
        </p>

        <div className="mt-6 grid gap-px border border-line bg-line lg:grid-cols-[1.3fr_1fr]">
          {/* Door A: the form */}
          <div className="bg-card p-6">
            {status === "done" ? (
              <div>
                <span className="font-mono text-[12px] text-ink-faint">A</span>
                <h3 className="t-h3 mt-3 text-[30px] text-ink">Got it.</h3>
                <p className="mt-3 max-w-[48ch] text-[16px] text-ink-soft">
                  I reply within 24 hours with what I would do first. My strategy work is open in the other tab; if it
                  did not open, it is one tap away.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={PORTFOLIO} target="_blank" rel="noopener noreferrer" className="btn">
                    See the work <span aria-hidden>↗</span>
                  </a>
                  <a href={TOPMATE} target="_blank" rel="noopener noreferrer" onClick={() => track("work_topmate")} className="btn-ghost">
                    Book a call on Topmate <span aria-hidden className="text-ink-faint">↗</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={submit}>
                <span className="font-mono text-[12px] text-ink-faint">A</span>
                <h3 className="t-h3 mt-3 text-[30px] text-ink">Tell me about your channel</h3>
                <p className="mt-2 text-[15px] text-ink-soft">Three fields. I reply within 24 hours with what I would do first.</p>
                {/* honeypot: visually hidden, off-screen, not focusable */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />
                <div className="mt-5 grid gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    aria-label="Your email"
                    autoComplete="email"
                    required
                    className="field"
                  />
                  <input
                    type="text"
                    inputMode="url"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    placeholder="Your channel link, like youtube.com/@yourchannel"
                    aria-label="Your channel link"
                    maxLength={300}
                    className="field"
                  />
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="One line: what do you want the channel to do?"
                    aria-label="What do you want the channel to do"
                    rows={3}
                    maxLength={600}
                    className="field"
                  />
                </div>
                <button type="submit" disabled={status === "sending"} className="btn mt-4">
                  {status === "sending" ? "Sending…" : "Send, and see the work"} <span aria-hidden>↗</span>
                </button>
                <p className="mt-3 text-[13px] text-ink-faint">
                  Sending opens my strategy work at yt.shivamvashisth.com in a new tab. Your details go to my own database
                  and nowhere else.
                </p>
                {status === "error" && (
                  <p className="mt-3 text-[14px] text-lose">
                    Couldn&rsquo;t save that just now.{" "}
                    <a href={mailto} className="underline underline-offset-4">
                      Email me instead
                    </a>
                    , the message is prefilled.
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Door B: Topmate, out front */}
          <div className="flex flex-col bg-card p-6">
            <span className="font-mono text-[12px] text-ink-faint">B</span>
            <h3 className="t-h3 mt-3 text-[30px] text-ink">Book a strategy call</h3>
            <p className="mt-2 flex-1 text-[15px] text-ink-soft">
              Want to talk before the trial week? Book a call on Topmate. You pick the slot, it is paid there, and we
              start with your channel on screen.
            </p>
            <a
              href={TOPMATE}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("work_topmate")}
              className="btn mt-6 justify-center"
            >
              Book on Topmate <span aria-hidden>↗</span>
            </a>
            <p className="mt-3 text-center font-mono text-[12px] text-ink-faint">topmate.io/shivamvashisth</p>
          </div>
        </div>

        <p className="mt-6 text-[15px] text-ink-faint">
          The full picture, results first:{" "}
          <a href={PORTFOLIO} target="_blank" rel="noopener noreferrer" className="text-acc underline underline-offset-4">
            yt.shivamvashisth.com
          </a>
          . I work remote from India, on EU hours or US mornings.
        </p>
      </div>
    </section>
  );
}
