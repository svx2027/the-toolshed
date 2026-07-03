import Link from "next/link";
import { Reveal } from "./Reveal";
import { RESOURCES } from "@/lib/resources";

/**
 * "Free resources" — the editorial index of every prompt drop shared on
 * Instagram, so the site itself is a complete map: no reel, no DM, no
 * comment-keyword needed to find any of it.
 */
export function ResourceIndex() {
  const live = RESOURCES.filter((r) => r.status === "live");

  // ItemList schema: search engines see the same index visitors do.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free resources by Code for Creatives India",
    itemListElement: live.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${r.code} ${r.title}`,
      url: `https://shivamvashisth.com${r.href}`,
    })),
  };

  return (
    <section id="resources" className="relative z-10 mx-auto max-w-3xl scroll-mt-24 px-5 py-24 sm:px-7 sm:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">Free resources</p>
        <h2 className="mt-2 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Every drop, in one place
        </h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-5 max-w-xl text-ink-soft">
          The links I share on Instagram live here too. No hunting through comments, no keyword to
          remember. Each one is yours, follower or not.
        </p>
      </Reveal>

      <ul className="mt-12 list-none border-t border-line">
        {RESOURCES.map((r, i) =>
          r.status === "live" ? (
            <li key={r.code}>
              <Reveal delay={0.05 + Math.min(i, 4) * 0.06}>
                <Link
                href={r.href}
                className="group flex items-baseline gap-4 border-b border-line py-7 sm:gap-7"
              >
                <span className="w-14 shrink-0 font-mono text-sm tracking-wide text-acc-lavender">
                  {r.code}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="kinetic-link font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                      {r.title}
                    </span>
                    <span className="hidden shrink-0 font-mono text-xs uppercase tracking-[0.16em] text-ink-faint sm:inline">
                      {r.dated}
                    </span>
                  </span>
                  <span className="mt-2 block max-w-[60ch] text-sm leading-relaxed text-ink-soft">
                    {r.oneLiner}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="shrink-0 text-ink-faint transition-[color,transform] duration-300 ease-out group-hover:translate-x-1 group-hover:text-ink"
                >
                  →
                </span>
                </Link>
              </Reveal>
            </li>
          ) : (
            <li key={r.code}>
              <Reveal delay={0.05 + Math.min(i, 4) * 0.06}>
                <div className="flex items-baseline gap-4 border-b border-line py-7 sm:gap-7">
                <span className="w-14 shrink-0 font-mono text-sm tracking-wide text-ink-faint/70">
                  {r.code}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-2xl font-medium tracking-tight text-ink-faint sm:text-3xl">
                      {r.title}
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-acc-peach">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-acc-peach" />
                      {r.dated}
                    </span>
                  </span>
                  <span className="mt-2 block max-w-[60ch] text-sm leading-relaxed text-ink-faint">
                    {r.oneLiner}
                  </span>
                </span>
              </div>
              </Reveal>
            </li>
          ),
        )}
      </ul>
    </section>
  );
}
