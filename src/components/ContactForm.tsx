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
      <p className="mt-4 border-l-2 border-win pl-3 text-[15px] text-ink">
        Locked in. I&rsquo;ll email you the day the next tool ships.
      </p>
    );
  }

  return (
    <div className="mt-4">
      <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
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
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-label="Your email"
          required
          className="field"
        />
        <button type="submit" disabled={status === "sending"} className="btn justify-center whitespace-nowrap">
          {status === "sending" ? "Sending…" : "Email me new tools"}
        </button>
      </form>
      <p className="mt-2 text-[13px] text-ink-faint">
        Just your email, stored on my own Supabase. Never sold, never rented. Reply or DM to unsubscribe.
      </p>
      {status === "error" && (
        <p className="mt-2 text-[14px] text-lose">
          Couldn&rsquo;t save that just now. Try again, or just{" "}
          <a href="https://instagram.com/svx2027" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            DM me on Instagram
          </a>
          .
        </p>
      )}
    </div>
  );
}
