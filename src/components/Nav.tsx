"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
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
  { label: "About", href: "#about" },
  { label: "Help", href: "#faq" },
  { label: "Contact", href: "#contact" },
  { label: "Instagram", href: "https://instagram.com/svx2027", external: true },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // lock background scroll while open, close on Escape, manage focus
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => closeRef.current?.focus(), 80);
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
    const id = item.href.replace(/^#/, "");
    window.setTimeout(() => {
      if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
      else document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 240);
  }, []);

  return (
    <>
      {/* hairline scroll-progress line */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-acc-lavender"
      />

      {/* top bar: own translucent bg so text stays readable over any section
          (incl. the inverted Mission band that scrolls beneath it) */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-paper/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 sm:px-7">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="min-w-0 truncate font-display text-base font-semibold text-ink sm:text-lg"
            aria-label="Code for Creatives India, back to top"
          >
            <span className="hidden sm:inline">Code&nbsp;for&nbsp;Creatives&nbsp;India</span>
            <span className="sm:hidden">Code&nbsp;for&nbsp;Creatives</span>
          </button>

          <div className="flex flex-shrink-0 items-center gap-2 sm:gap-2.5">
            {/* Files: persistent primary destination, outside the menu */}
            <a
              href={FILES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-line-strong px-3 py-2 text-sm font-medium text-ink transition-colors hover:border-ink sm:px-4"
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
              className="group inline-flex items-center gap-2.5 rounded-full border border-line-strong px-3 py-2 text-sm font-medium text-ink transition-colors hover:border-ink sm:px-4"
            >
              <span className="hidden font-mono text-xs uppercase tracking-[0.18em] sm:inline">Index</span>
              <span className="relative block h-3 w-4" aria-hidden>
                <span className="absolute left-0 top-0.5 block h-[2px] w-4 bg-current" />
                <span className="absolute left-0 top-[9px] block h-[2px] w-4 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* full-screen overlay takeover */}
      <AnimatePresence>
        {open && (
          <motion.nav
            key="overlay"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
            className="fixed inset-0 z-[55] flex flex-col bg-ink text-paper"
            aria-label="Site menu"
          >
            {/* explicit close: top-right X */}
            <button
              ref={closeRef}
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors hover:border-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-paper sm:right-7"
            >
              <span className="relative block h-4 w-4" aria-hidden>
                <span className="absolute left-0 top-1.5 block h-[2px] w-4 rotate-45 bg-current" />
                <span className="absolute left-0 top-1.5 block h-[2px] w-4 -rotate-45 bg-current" />
              </span>
            </button>

            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 sm:px-7">
              <p className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-paper/50">The index</p>
              <ul className="space-y-1 sm:space-y-2">
                {PRIMARY.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 36 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.12 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button onClick={() => go(item)} className="group flex w-full items-baseline gap-4 py-1.5 text-left sm:gap-7">
                      <span className="font-mono text-sm text-paper/40 sm:text-base">{item.n}</span>
                      <span className="kinetic-link font-display text-[2.8rem] font-medium leading-[1.04] tracking-tight sm:text-[4.8rem]">
                        {item.label}
                        {item.external && <span className="align-super text-[0.38em] text-paper/50"> ↗</span>}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.16em] text-paper/55"
              >
                {SECONDARY.map((s) => (
                  <button key={s.label} onClick={() => go(s)} className="transition-colors hover:text-paper">
                    {s.label}
                    {s.external && <span aria-hidden> ↗</span>}
                  </button>
                ))}
                <a href="mailto:vashisthshivam00@gmail.com" className="transition-colors hover:text-paper">
                  vashisthshivam00@gmail.com
                </a>
                <span className="text-paper/35">Code for Creatives India</span>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
