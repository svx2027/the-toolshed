"use client";

import { useEffect, useRef } from "react";

// The page read as a broadcast rundown: one segment per chapter, each filling as you scroll past it.
// Sticky under the top bar. On a phone the labels fold into one line naming the current chapter.
const CHAPTERS: [string, string][] = [
  ["top", "Showdown"],
  ["mission", "Mission"],
  ["toolshed", "Garage"],
  ["start", "Start here"],
  ["cases", "Build notes"],
  ["about", "About"],
  ["faq", "Help"],
  ["contact", "Contact"],
];

export function ChapterRail() {
  const ref = useRef<HTMLElement>(null);
  const nowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const segs = Array.from(root.querySelectorAll<HTMLElement>(".rail-seg"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight * 0.45;
      let now = CHAPTERS[0];
      segs.forEach((seg, i) => {
        const el = document.getElementById(CHAPTERS[i][0]);
        if (!el) return;
        const r = el.getBoundingClientRect();
        const next = document.getElementById(CHAPTERS[i + 1]?.[0] ?? "");
        const end = next ? next.getBoundingClientRect().top : r.bottom;
        const p = Math.max(0, Math.min(1, (mid - r.top) / Math.max(1, end - r.top)));
        seg.style.setProperty("--p", p.toFixed(3));
        if (p > 0) now = CHAPTERS[i];
      });
      if (nowRef.current) nowRef.current.textContent = now[1];
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const go = (id: string) => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (id === "top") window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <nav ref={ref} aria-label="Chapters" className="sticky top-14 z-40 border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex gap-2 pb-2 pt-2.5 sm:gap-3.5">
          {CHAPTERS.map(([id, label], i) => (
            <button
              key={id}
              onClick={() => go(id)}
              className="rail-seg grid min-w-0 flex-1 gap-1.5 text-left"
              aria-label={`Chapter ${i + 1}: ${label}`}
            >
              <span className="relative block h-[2px] bg-line">
                <i className="absolute inset-y-0 left-0 bg-acc" />
              </span>
              <span className="hidden truncate font-mono text-[11px] leading-none text-ink-faint sm:block">
                <b className="mr-2 font-normal text-ink">{String(i + 1).padStart(2, "0")}</b>
                {label}
              </span>
            </button>
          ))}
        </div>
        <span ref={nowRef} className="block pb-2 font-mono text-[11px] leading-none text-ink sm:hidden">
          Showdown
        </span>
      </div>
    </nav>
  );
}
