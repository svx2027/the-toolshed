"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

type Item = { n?: string; label: string; href: string; external?: boolean };

const FILES_URL = "https://files.shivamvashisth.com";

// Rule of three: exactly three primary destinations in the Index.
const PRIMARY: Item[] = [
  { n: "01", label: "The Garage", href: "#toolshed" },
  { n: "02", label: "The Mission", href: "#mission" },
  { n: "03", label: "Files", href: FILES_URL, external: true },
];
// Secondary links live in the small meta row, not as giant choices.
const SECONDARY: Item[] = [
  { label: "Start here", href: "#start" },
  { label: "Free resources", href: "#resources" },
  { label: "Case studies", href: "/case-studies/" },
  { label: "How it's built", href: "/how-this-portfolio-builds-itself/" },
  { label: "About", href: "#about" },
  { label: "Help", href: "#faq" },
  { label: "Contact", href: "#contact" },
  { label: "Instagram", href: "https://instagram.com/svx2027", external: true },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // lock background scroll while open, close on Escape, manage focus
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => closeRef.current?.focus(), 40);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      toggleRef.current?.focus();
    };
  }, [open]);

  const go = useCallback((item: Item) => {
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      setOpen(false);
      return;
    }
    setOpen(false);
    if (item.href.startsWith("/")) {
      window.location.href = item.href;
      return;
    }
    const id = item.href.replace(/^#/, "");
    if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      {/* top bar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="t-h3 min-w-0 truncate text-[20px] text-ink"
            aria-label="Code for Creatives India, back to top"
          >
            <span className="hidden sm:inline">Code&nbsp;for&nbsp;Creatives&nbsp;India</span>
            <span className="sm:hidden">Code&nbsp;for&nbsp;Creatives</span>
          </button>

          <div className="flex flex-shrink-0 items-center gap-2">
            {/* Files: persistent primary destination, outside the menu */}
            <a
              href={FILES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !py-2 !text-[13px]"
            >
              Files
              <span aria-hidden className="text-ink-faint">↗</span>
            </a>
            <ThemeToggle />
            <button
              ref={toggleRef}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="btn !py-2 !text-[13px]"
            >
              <span className="font-mono text-[12px] uppercase tracking-[0.08em]">Index</span>
              <span className="relative block h-3 w-4" aria-hidden>
                <span className="absolute left-0 top-0.5 block h-[2px] w-4 bg-current" />
                <span className="absolute left-0 top-[9px] block h-[2px] w-4 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* the Index: a full sheet in ink, same three doors, same small row */}
      {open && (
        <nav className="fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-ink text-paper" aria-label="Site menu">
          <button
            ref={closeRef}
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute right-4 top-3 z-10 inline-flex h-10 w-10 items-center justify-center border border-paper/30 text-paper hover:border-paper sm:right-6"
          >
            <span className="relative block h-4 w-4" aria-hidden>
              <span className="absolute left-0 top-1.5 block h-[2px] w-4 rotate-45 bg-current" />
              <span className="absolute left-0 top-1.5 block h-[2px] w-4 -rotate-45 bg-current" />
            </span>
          </button>

          <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-20 sm:px-6">
            <p className="t-kicker mb-8 !text-paper/50">The index</p>
            <ul className="divide-y divide-paper/15 border-y border-paper/15">
              {PRIMARY.map((item) => (
                <li key={item.label}>
                  <button onClick={() => go(item)} className="flex w-full items-baseline gap-5 py-4 text-left sm:gap-8">
                    <span className="font-mono text-sm text-paper/40 sm:text-base">{item.n}</span>
                    <span className="t-display text-[clamp(44px,9vw,110px)] hover:text-strap">
                      {item.label}
                      {item.external && <span className="align-super text-[0.38em] text-paper/50"> ↗</span>}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[12px] uppercase tracking-[0.08em] text-paper/60">
              {SECONDARY.map((s) => (
                <button key={s.label} onClick={() => go(s)} className="hover:text-paper">
                  {s.label}
                  {s.external && <span aria-hidden> ↗</span>}
                </button>
              ))}
              <a href="mailto:vashisthshivam00@gmail.com" className="hover:text-paper">
                vashisthshivam00@gmail.com
              </a>
              <span className="text-paper/35">Code for Creatives India</span>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
