"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

type Item = { n: string; label: string; href: string; external?: boolean };

const ITEMS: Item[] = [
  { n: "01", label: "The Garage", href: "#toolshed" },
  { n: "02", label: "The Mission", href: "#mission" },
  { n: "03", label: "About", href: "#about" },
  { n: "04", label: "Contact", href: "#contact" },
  { n: "05", label: "Files", href: "https://files.shivamvashisth.com", external: true },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  // lock background scroll while the overlay is open + close on Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
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

      {/* top bar */}
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-7">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-lg font-semibold text-ink"
            aria-label="Back to top"
          >
            <span className="hidden sm:inline">Shivam&nbsp;Vashisth</span>
            <span className="sm:hidden">SV</span>
          </button>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="group inline-flex items-center gap-2.5 rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              <span className="hidden font-mono text-xs uppercase tracking-[0.18em] sm:inline">
                {open ? "Close" : "Index"}
              </span>
              <span className="relative block h-3 w-4" aria-hidden>
                <span className={`absolute left-0 block h-[2px] w-4 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0.5"}`} />
                <span className={`absolute left-0 block h-[2px] w-4 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-[9px]"}`} />
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
          >
            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 sm:px-7">
              <p className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-paper/50">The index</p>
              <ul className="space-y-1 sm:space-y-2">
                {ITEMS.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 36 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.12 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button
                      onClick={() => go(item)}
                      className="group flex w-full items-baseline gap-4 py-1.5 text-left sm:gap-7"
                    >
                      <span className="font-mono text-sm text-paper/40 sm:text-base">{item.n}</span>
                      <span className="kinetic-link font-display text-[2.6rem] font-medium leading-[1.04] tracking-tight sm:text-[4.5rem]">
                        {item.label}
                        {item.external && <span className="align-super text-[0.4em] text-paper/50"> ↗</span>}
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
                className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.18em] text-paper/55"
              >
                <a href="https://instagram.com/svx2027" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-paper">
                  Instagram ↗
                </a>
                <a href="mailto:hi@shivamvashisth.com" className="transition-colors hover:text-paper">
                  hi@shivamvashisth.com
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
