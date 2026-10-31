"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/faq";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-28 border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="t-kicker">Help</p>
        <h2 className="t-h2 mt-4 text-[clamp(40px,6.5vw,80px)] text-ink">Fair questions</h2>

        <div className="mt-8 max-w-3xl border-t border-line">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  className="flex w-full items-start justify-between gap-4 py-4 text-left"
                >
                  <span className="text-[17px] font-semibold text-ink">{item.q}</span>
                  <span aria-hidden className="t-num shrink-0 text-[22px] text-ink-faint">
                    {isOpen ? "–" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div id={`faq-a-${i}`}>
                    <p className="pb-5 text-[16px] leading-relaxed text-ink-soft">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-[15px] text-ink-faint">
          Something else on your mind?{" "}
          <a href="https://instagram.com/svx2027" target="_blank" rel="noopener noreferrer" className="text-acc underline underline-offset-4">
            DM me
          </a>{" "}
          and ask.
        </p>
      </div>
    </section>
  );
}
