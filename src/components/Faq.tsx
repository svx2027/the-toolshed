"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/faq";
import { Reveal } from "./Reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative z-10 mx-auto max-w-3xl scroll-mt-24 px-5 py-24 sm:px-7 sm:py-28">
      <Reveal className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">Help</p>
        <h2 className="mt-2 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Fair questions
        </h2>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-10 divide-y divide-line rounded-3xl border border-line bg-card shadow-sm">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8"
                >
                  <span className="font-display text-lg font-medium text-ink">{item.q}</span>
                  <motion.span
                    aria-hidden
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="relative block h-4 w-4 shrink-0 text-ink-faint"
                  >
                    <span className="absolute left-0 top-[7px] block h-[2px] w-4 bg-current" />
                    <span className="absolute left-[7px] top-0 block h-4 w-[2px] bg-current" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-ink-soft sm:px-8">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-6 text-center text-sm text-ink-faint">
          Something else on your mind?{" "}
          <a
            href="https://instagram.com/svx2027"
            target="_blank"
            rel="noopener noreferrer"
            className="text-acc-sky underline-offset-2 hover:underline"
          >
            DM me
          </a>{" "}
          and ask.
        </p>
      </Reveal>
    </section>
  );
}
