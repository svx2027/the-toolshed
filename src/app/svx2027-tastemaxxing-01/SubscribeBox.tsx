"use client";

import { useState } from "react";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Optional email capture for the drop series — same backend as the homepage form, tagged source: "drop-01". */
export function SubscribeBox() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot: real people never see this
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = email.trim();
    if (!v || !EMAIL_RE.test(v)) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: v, company, source: "drop-01" }),
      });
      setStatus(res.ok ? "done" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="mb-12 rounded-2xl bg-mint/50 p-6 sm:p-8 dark:bg-card dark:border dark:border-line">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-acc-mint">
        Drop 02 is coming
      </p>
      <h2 className="font-display text-2xl font-semibold text-ink">
        Want the next one delivered straight to your inbox?
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        Just leave your email here. One email per drop, nothing else, and everything above works
        whether you do or not.
      </p>
      {status === "done" ? (
        <p className="mt-4 text-sm font-medium text-acc-mint">
          Locked in. Drop 02 lands in your inbox the day it ships ✓
        </p>
      ) : (
        <div className="mt-4">
          <form onSubmit={submit} className="flex max-w-md flex-nowrap gap-2.5">
            {/* honeypot: visually hidden, off-screen, not focusable */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              aria-label="Your email"
              required
              className="w-full rounded-[10px] border border-line-strong bg-card px-3.5 py-2.5 text-ink outline-none transition-shadow focus:border-acc-sky focus:ring-2 focus:ring-acc-sky/20"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="shrink-0 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {status === "sending" ? "Saving…" : "Send me drop 02"}
            </button>
          </form>
          <p className="mt-2 text-[0.8rem] text-ink-faint">
            Just your email, stored on my own private database. Never sold, never rented. Reply to
            any email to unsubscribe.
          </p>
          {status === "error" && (
            <p className="mt-1 text-[0.8rem] text-acc-rose">
              Couldn&apos;t save that just now. Try again, or DM me{" "}
              <a
                href="https://instagram.com/svx2027"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                @svx2027
              </a>{" "}
              and I&apos;ll add you by hand.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
