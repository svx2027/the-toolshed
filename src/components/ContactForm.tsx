"use client";

import { useState } from "react";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function ContactForm() {
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
        body: JSON.stringify({ email: v, company }),
      });
      setStatus(res.ok ? "done" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <p className="mt-3 text-sm text-acc-mint">
        Locked in. I&rsquo;ll email you the day the next tool ships.
      </p>
    );
  }

  return (
    <div className="mt-2">
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
          className="shrink-0 rounded-full bg-ink px-5 py-2.5 font-medium text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Email me new tools"}
        </button>
      </form>
      <p className="mt-2 text-[0.8rem] text-ink-faint">
        Just your email, stored on my own Supabase. Never sold, never rented. Reply or DM to unsubscribe.
      </p>
      {status === "error" && (
        <p className="mt-1 text-[0.8rem] text-acc-rose">
          Couldn&rsquo;t save that just now. Try again, or just{" "}
          <a href="https://instagram.com/svx2027" target="_blank" rel="noopener noreferrer" className="underline">
            DM me on Instagram
          </a>
          .
        </p>
      )}
    </div>
  );
}
