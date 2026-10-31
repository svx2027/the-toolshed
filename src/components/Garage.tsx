"use client";

import { useState } from "react";
import { TOOLS, ICONS, type Audience } from "@/lib/tools";

type Filter = "all" | Audience;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "everyone", label: "For everyone" },
  { key: "creator", label: "For creators" },
];

function ToolCard({ tool, index }: { tool: (typeof TOOLS)[number]; index: number }) {
  const inner = (
    <>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[12px] text-ink-faint">{String(index + 1).padStart(2, "0")}</span>
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-ink"
          dangerouslySetInnerHTML={{ __html: ICONS[tool.icon] }}
        />
      </div>
      <div className="mt-6 flex-1">
        <h3 className="t-h3 text-[26px] text-ink">{tool.name}</h3>
        <p className="mt-2 text-[15px] text-ink-soft">{tool.desc}</p>
      </div>
      <div className="mt-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
        <span className="inline-flex items-center gap-1.5">
          <span className={`inline-block h-1.5 w-1.5 rounded-full ${tool.live ? "bg-win" : "border border-acc-peach"}`} />
          {tool.live ? "live" : "on blocks"}
        </span>
        <span>{tool.aud === "creator" ? "creators" : "everyone"}</span>
      </div>
    </>
  );
  const cls = "flex h-full flex-col bg-card p-6";
  if (tool.live) {
    return (
      <a href={`/t/${tool.slug}/`} target="_blank" rel="noopener noreferrer" className={`${cls} hover:bg-paper`}>
        {inner}
      </a>
    );
  }
  return (
    <div className={cls}>
      {inner}
      <a href="#contact" className="mt-3 text-[13px] text-acc underline underline-offset-4">
        Get an email when it ships ↓
      </a>
    </div>
  );
}

export function Garage() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = TOOLS.filter((t) => filter === "all" || t.aud === filter);

  return (
    <section id="toolshed" className="scroll-mt-28 border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="t-kicker">The Garage</p>
        <h2 className="t-h2 mt-4 text-[clamp(40px,6.5vw,80px)] text-ink">A garage full of tiny apps</h2>
        <p className="mt-5 max-w-2xl text-[17px] text-ink-soft">
          Built in public. Live builds open in a tap. The rest are up on blocks, getting finished. New one most weeks.
          Follow{" "}
          <a href="https://instagram.com/svx2027" target="_blank" rel="noopener noreferrer" className="text-acc underline underline-offset-4">
            @svx2027
          </a>{" "}
          to watch each one come together.
        </p>
        <p className="mt-3 text-[15px] text-ink-faint">
          New here? Start with{" "}
          <a href="/t/life-in-weeks/" target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4">Life in Weeks</a>,{" "}
          <a href="/t/read-rate/" target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4">Read Rate</a>, or{" "}
          <a href="/t/aligned/" target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4">Aligned</a>.
        </p>

        <div className="mt-8 flex gap-6 border-b border-line" role="tablist" aria-label="Filter apps">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={`-mb-px border-b-2 pb-3 text-[15px] font-medium ${
                filter === f.key ? "border-ink text-ink" : "border-transparent text-ink-faint hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((t, i) => (
            <ToolCard key={t.slug} tool={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
