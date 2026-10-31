import Link from "next/link";
import { RESOURCES } from "@/lib/resources";

/**
 * "Free resources": the editorial index of every prompt drop shared on
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

  const Row = ({ r }: { r: (typeof RESOURCES)[number] }) => (
    <span className="grid gap-x-6 gap-y-1 sm:grid-cols-[88px_1fr_auto] sm:items-baseline">
      <span className="font-mono text-[12px] text-ink-faint">{r.code}</span>
      <span>
        <span className="block">
          <span className="t-h3 text-[24px] text-ink">{r.title}</span>
          <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
            {r.status === "brewing" && <span aria-hidden className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full border border-acc-peach align-[1px]" />}
            {r.dated}
          </span>
        </span>
        <span className="mt-1 block max-w-2xl text-[15px] text-ink-soft">{r.oneLiner}</span>
      </span>
      {r.status === "live" && <span aria-hidden className="hidden text-ink sm:block">→</span>}
    </span>
  );

  return (
    <section id="resources" className="scroll-mt-28 border-b border-line">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="t-kicker">Free resources</p>
        <h2 className="t-h2 mt-4 text-[clamp(40px,6.5vw,80px)] text-ink">Every drop, in one place</h2>
        <p className="mt-5 max-w-2xl text-[17px] text-ink-soft">
          The links I share on Instagram live here too. No hunting through comments, no keyword to remember. Each one is
          yours, follower or not.
        </p>

        <ul className="mt-8 border-t border-line">
          {RESOURCES.map((r) => (
            <li key={r.code} className="border-b border-line">
              {r.status === "live" ? (
                <Link href={r.href} className="block py-5 hover:bg-card">
                  <Row r={r} />
                </Link>
              ) : (
                <div className="block py-5 opacity-80">
                  <Row r={r} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
