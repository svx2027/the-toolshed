"use client";

import { useState } from "react";

export function ContactForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = email.trim();
    if (!v || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) return;
    try {
      const raw = localStorage.getItem("ts_sub");
      const subs = raw ? JSON.parse(raw) : [];
      const list = Array.isArray(subs) ? subs : [];
      list.push({ email: v, tool: "home", at: new Date().toISOString() });
      localStorage.setItem("ts_sub", JSON.stringify(list));
    } catch {}
    setDone(true);
    setEmail("");
  };

  if (done) {
    return (
      <p className="mt-2 text-sm text-acc-mint">
        Thanks! I&rsquo;ll email you when the next app ships.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mt-2 flex max-w-md flex-nowrap gap-2.5">
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
        className="shrink-0 rounded-full bg-ink px-5 py-2.5 font-medium text-paper transition-transform hover:-translate-y-0.5"
      >
        Send me the next app
      </button>
    </form>
  );
}
