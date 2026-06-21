"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { GLOSSARY } from "@/lib/jargon";

export function Jargon({ term, children }: { term: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const def = GLOSSARY[term.toLowerCase()];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onDoc);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDoc);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!def) return <>{children}</>;

  return (
    <span ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        className="cursor-help border-b border-dotted border-ink-faint text-inherit"
      >
        {children}
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute bottom-[calc(100%+9px)] left-1/2 z-30 w-max max-w-[min(240px,78vw)] -translate-x-1/2 rounded-[10px] border border-line-strong bg-card px-2.5 py-2 text-left text-[0.82rem] font-normal normal-case leading-snug tracking-normal text-ink-soft shadow-lg"
        >
          {def}
        </span>
      )}
    </span>
  );
}
