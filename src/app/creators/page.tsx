import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { CREATORS, type Creator, type Social } from "@/lib/creators";
import { RevealController } from "@/components/RevealController";
import { SubscribeBox } from "@/components/SubscribeBox";
import { TrackedLink } from "@/components/TrackedLink";

// The creator shelf. All content lives in src/lib/creators.ts; photos live in
// public/creators/<slug>.jpg and are picked up automatically when the file exists.

const N = CREATORS.length;

export const metadata: Metadata = {
  title: `The ${N} creators who taught me to talk to AI`,
  description:
    "If Claude feels hard to talk to, it is a vocabulary problem, not a skill problem. These are the creators who gave me the words, with the exact video or post to start with.",
  alternates: { canonical: "/creators/" },
  openGraph: {
    type: "article",
    title: `The ${N} creators who taught me to talk to AI`,
    description:
      "The people who gave me the words to build with AI, and the one thing from each of them you should watch or read first.",
    url: "/creators/",
    images: ["/assets/og-home.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `The ${N} creators who taught Shivam Vashisth to talk to AI`,
  url: "https://shivamvashisth.com/creators/",
  itemListElement: CREATORS.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Person",
      name: c.name,
      description: c.tagline,
      sameAs: c.socials.map((s) => s.url),
    },
  })),
};

// Literal class names per accent so Tailwind can see them at build time.
const ACCENT: Record<
  Creator["accent"],
  { kicker: string; quote: string; tile: string; initials: string; ring: string }
> = {
  lavender: {
    kicker: "text-acc-lavender",
    quote: "border-acc-lavender",
    tile: "bg-lavender dark:bg-paper",
    initials: "text-acc-lavender",
    ring: "dark:ring-acc-lavender/30",
  },
  peach: {
    // light acc-peach (#c2693a) is 3.9:1 on white and fails AA for text; darken it
    // in light mode only, keep the theme token in dark mode where it reads fine.
    kicker: "text-[#a8541f] dark:text-acc-peach",
    quote: "border-acc-peach",
    tile: "bg-peach dark:bg-paper",
    initials: "text-acc-peach",
    ring: "dark:ring-acc-peach/30",
  },
  mint: {
    // light acc-mint (#2f8f63) is 4.0:1 on white and fails AA; darken for light only.
    kicker: "text-[#1f7a52] dark:text-acc-mint",
    quote: "border-acc-mint",
    tile: "bg-mint dark:bg-paper",
    initials: "text-acc-mint",
    ring: "dark:ring-acc-mint/30",
  },
  sky: {
    kicker: "text-acc-sky",
    quote: "border-acc-sky",
    tile: "bg-sky dark:bg-paper",
    initials: "text-acc-sky",
    ring: "dark:ring-acc-sky/30",
  },
};

function photoFor(slug: string): string | null {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    if (existsSync(path.join(process.cwd(), "public", "creators", `${slug}.${ext}`))) {
      return `/creators/${slug}.${ext}`;
    }
  }
  return null;
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function SocialIcon({ platform }: { platform: Social["platform"] }) {
  const common = { width: 14, height: 14, viewBox: "0 0 24 24", "aria-hidden": true };
  switch (platform) {
    case "youtube":
      return (
        <svg {...common} fill="currentColor">
          <path d="M23 7.6a4 4 0 0 0-2.8-2.8C18.2 4.3 12 4.3 12 4.3s-6.2 0-8.2.5A4 4 0 0 0 1 7.6 41 41 0 0 0 .5 12 41 41 0 0 0 1 16.4a4 4 0 0 0 2.8 2.8c2 .5 8.2.5 8.2.5s6.2 0 8.2-.5a4 4 0 0 0 2.8-2.8A41 41 0 0 0 23.5 12 41 41 0 0 0 23 7.6ZM9.8 15.3V8.7l6 3.3-6 3.3Z" />
        </svg>
      );
    case "substack":
      return (
        <svg {...common} fill="currentColor">
          <path d="M4 3h16v2.3H4V3Zm0 4.6h16V10H4V7.6Zm0 4.7h16V22l-8-4.6L4 22v-9.7Z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common} fill="currentColor">
          <path d="M18.2 2H21.5l-7.2 8.3L22.8 22h-6.6l-5.2-6.8L5 22H1.7l7.7-8.9L1.2 2h6.8l4.7 6.2L18.2 2Zm-1.2 18h1.8L6.9 3.9H5L17 20Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common} fill="currentColor">
          <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.4 8.4h4.6V24H.4V8.4Zm7.7 0h4.4v2.1h.1c.6-1.2 2.1-2.4 4.4-2.4 4.7 0 5.5 3.1 5.5 7.1V24h-4.6v-7.7c0-1.8 0-4.2-2.5-4.2s-3 2-3 4V24H8.1V8.4Z" />
        </svg>
      );
    case "web":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a13.5 13.5 0 0 1 0 18M12 3a13.5 13.5 0 0 0 0 18" />
        </svg>
      );
    default: {
      const _exhaustive: never = platform;
      return _exhaustive;
    }
  }
}

function CreatorCard({ creator, index }: { creator: Creator; index: number }) {
  const a = ACCENT[creator.accent];
  const photo = photoFor(creator.slug);
  const nn = String(index + 1).padStart(2, "0");
  const { kind, title, url, note } = creator.bestWork;

  return (
    <article
      data-reveal
      className="creator-card relative rounded-3xl border border-line bg-card p-6 shadow-sm sm:p-8"
    >
      {/* the big index number, clipped to its own corner so it never trims the card's glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden>
        <span className="absolute -top-7 right-1 select-none font-display text-[7rem] font-semibold leading-none text-ink opacity-[0.05] dark:opacity-[0.09]">
          {nn}
        </span>
      </div>

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="shrink-0">
          {photo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={photo}
              alt={creator.name}
              width={144}
              height={144}
              loading="lazy"
              decoding="async"
              className="creator-photo h-28 w-28 rounded-2xl border border-line object-cover sm:h-36 sm:w-36"
            />
          ) : (
            <div
              className={`creator-photo flex h-28 w-28 items-center justify-center rounded-2xl border border-line sm:h-36 sm:w-36 ${a.tile} ${a.ring} dark:ring-1 dark:ring-inset`}
            >
              <span className={`font-display text-4xl font-semibold ${a.initials}`}>
                {initialsOf(creator.name)}
              </span>
            </div>
          )}
        </div>

        <div className="min-w-0">
          <p className={`mb-1 font-mono text-[13px] font-semibold uppercase tracking-widest ${a.kicker}`}>
            {nn} · {kind === "Watch" ? "Watch first" : "Read first"}
          </p>
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            {creator.name}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">{creator.tagline}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {creator.socials.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1 text-xs font-medium text-ink-soft transition-transform hover:-translate-y-0.5 hover:text-ink"
              >
                <SocialIcon platform={s.platform} />
                {s.handle}
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <blockquote
        className={`relative mt-6 border-l-2 pl-4 text-[0.95rem] leading-relaxed text-ink-soft ${a.quote}`}
      >
        {creator.review}
        <footer className="mt-2 font-display text-sm text-ink-faint">Why it made my list</footer>
      </blockquote>

      <div className="relative mt-6">
        <TrackedLink
          href={url}
          event={`creator_best_${creator.slug}`}
          ariaLabel={`${kind} this first: ${title}, by ${creator.name} (opens in new tab)`}
          className="cta-glow-card inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
        >
          {kind} this first →
        </TrackedLink>
        <p className="mt-3 text-xs leading-relaxed text-ink-faint">
          <span className="text-ink-soft">{title}.</span> {note}
        </p>
      </div>
    </article>
  );
}

export default function Creators() {
  return (
    <div className="relative z-10 mx-auto max-w-3xl px-5 pb-20 pt-8 sm:px-8">
      <RevealController />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <header className="mb-12 flex items-center justify-between text-sm">
        <Link href="/" className="font-medium text-ink-soft hover:text-ink">
          ← shivamvashisth.com
        </Link>
        <a
          href="https://www.instagram.com/svx2027"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-ink-faint hover:text-ink"
        >
          @svx2027
        </a>
      </header>

      {/* Hero */}
      <section className="mb-12" data-reveal>
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-acc-lavender">
          The shortlist
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          The {N} creators who gave me{" "}
          <span className="ink-underline">the words</span>
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          Talking to AI is a vocabulary problem, not a coding problem.
        </p>
        <p className="mt-3 leading-relaxed text-ink-soft">
          When Claude feels hard, it is because nobody gave you the words for what you want. These
          are the people who gave me mine. For each one: who they are, where to find them, what
          changed for me, and the one thing of theirs to start with. Work through the list and
          you&apos;ll have the words too.
        </p>
      </section>

      {/* How to use this page */}
      <section className="mb-10 rounded-2xl bg-sky/60 p-5 dark:bg-card dark:border dark:border-line" data-reveal>
        <p className="text-sm leading-relaxed text-ink-soft">
          <strong className="text-ink">How to use this list:</strong>{" "}one creator per evening.
          Open their &ldquo;start here&rdquo; link below, consume just that one thing, then try one
          prompt of your own while it&apos;s fresh. That&apos;s it.
        </p>
      </section>

      {/* The shelf */}
      <div className="space-y-8 sm:space-y-10">
        {CREATORS.map((c, i) => (
          <CreatorCard key={c.slug} creator={c} index={i} />
        ))}
      </div>

      {/* Where this leads */}
      <section className="mb-12 mt-12" data-reveal>
        <h2 className="font-display text-xl font-semibold text-ink">Got the words? Use them.</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          The fastest way to lock in a new vocabulary is to build something tiny with it.{" "}
          <Link href="/svx2027-tastemaxxing-01/" className="text-acc-sky underline-offset-2 hover:underline">
            Drop 01: TasteMaxxing
          </Link>{" "}
          gives you one prompt that turns your saved reels into a content brain. It&apos;s the
          exercise I&apos;d assign after this page.
        </p>
      </section>

      <div data-reveal>
        <SubscribeBox
          source="creators"
          kicker="This list grows"
          title="Want to hear when I add a creator or ship a new drop?"
          blurb="Leave your email. One short note when something new lands here, nothing else."
          cta="Keep me posted"
          success="Done. You'll hear about the next one first ✓"
        />
      </div>

      <footer className="border-t border-line pt-6 text-sm text-ink-faint">
        <p>
          Curated by{" "}
          <a className="text-acc-sky" href="https://www.instagram.com/svx2027" target="_blank" rel="noopener noreferrer">
            Shivam Vashisth
          </a>
          . No affiliate links, no sponsorships. These are just the people I actually learn from.
        </p>
      </footer>
    </div>
  );
}
