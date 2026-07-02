"use client";

import { useState } from "react";
import { TOOLS, ICONS, type Audience } from "@/lib/tools";
import { Reveal } from "./Reveal";

type Filter = "all" | Audience;
const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "everyone", label: "For everyone" },
  { key: "creator", label: "For creators" },
];

function ToolCard({ tool }: { tool: (typeof TOOLS)[number] }) {
  const inner = (
    <>
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110"
        style={{ background: tool.c }}
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke={tool.ac}
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          dangerouslySetInnerHTML={{ __html: ICONS[tool.icon] }}
        />
      </div>
      <div>
        <h3 className="font-display text-xl font-medium text-ink">{tool.name}</h3>
        <p className="mt-1 text-sm text-ink-soft">{tool.desc}</p>
      </div>
      <div className="mt-auto flex items-center gap-4 pt-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-faint">
        <span className="inline-flex items-center gap-1.5">
          <span className={`inline-block h-1.5 w-1.5 rounded-full ${tool.live ? "bg-acc-mint" : "border border-acc-peach"}`} />
          {tool.live ? "live" : "on blocks"}
        </span>
        <span>{tool.aud === "creator" ? "creators" : "everyone"}</span>
      </div>
    </>
  );

  const cls =
    "group flex h-full flex-col gap-4 rounded-3xl border border-line bg-card p-6 shadow-sm transition-all duration-200";

  if (tool.live) {
    return (
      <a
        href={`/t/${tool.slug}/`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cls} hover:-translate-y-1.5 hover:rotate-[-0.4deg] hover:border-line-strong hover:shadow-xl`}
      >
        {inner}
      </a>
    );
  }
  return (
    <div className={`${cls} opacity-90`}>
      {inner}
      <a href="#contact" className="-mt-2 text-sm text-acc-sky underline-offset-2 hover:underline">
        Get an email when it ships ↓
      </a>
    </div>
  );
}

export function Garage() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = TOOLS.filter((t) => filter === "all" || t.aud === filter);

  return (
    <section id="toolshed" className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-7 sm:py-32">
      <Reveal className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">The Garage</p>
        <h2 className="mx-auto mt-2 max-w-2xl font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          A garage full of tiny apps
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-ink-soft">
          Built in public. Live builds open in a tap. The rest are up on blocks, getting finished. New one most weeks.
          Follow{" "}
          <a href="https://instagram.com/svx2027" target="_blank" rel="noopener noreferrer" className="text-acc-sky underline-offset-2 hover:underline">
            @svx2027
          </a>{" "}
          to watch each one come together.
        </p>
        <p className="mx-auto mt-4 max-w-xl text-sm text-ink-faint">
          New here? Start with{" "}
          <a href="/t/life-in-weeks/" target="_blank" rel="noopener noreferrer" className="text-acc-sky underline-offset-2 hover:underline">Life in Weeks</a>,{" "}
          <a href="/t/read-rate/" target="_blank" rel="noopener noreferrer" className="text-acc-sky underline-offset-2 hover:underline">Read Rate</a>, or{" "}
          <a href="/t/aligned/" target="_blank" rel="noopener noreferrer" className="text-acc-sky underline-offset-2 hover:underline">Aligned</a>.
        </p>
      </Reveal>

      <div className="mt-10 flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="Filter apps">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            role="tab"
            aria-selected={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              filter === f.key ? "border-ink bg-ink text-paper" : "border-line-strong text-ink-soft hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((t, i) => (
          <Reveal key={t.slug} delay={i * 0.05} className="h-full">
            <ToolCard tool={t} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
