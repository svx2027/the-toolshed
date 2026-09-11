import type { Metadata } from "next";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/caseStudies";
import { RevealController } from "@/components/RevealController";
import { SubscribeBox } from "@/components/SubscribeBox";

export const metadata: Metadata = {
  title: "Case studies: the harder pipelines, end to end",
  description:
    "Design decisions, platform quirks, and honest scope behind the automation pipelines built for real YouTube channels, anonymized and open source.",
  alternates: { canonical: "/case-studies/" },
  openGraph: {
    type: "website",
    title: "Case studies: the harder pipelines, end to end",
    description:
      "Design decisions, platform quirks, and honest scope behind the automation pipelines built for real YouTube channels.",
    url: "/case-studies/",
    images: ["/assets/og-home.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Case studies by Shivam Vashisth",
  url: "https://shivamvashisth.com/case-studies/",
  itemListElement: CASE_STUDIES.map((cs, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Article",
      name: cs.title,
      description: cs.dek,
      url: `https://shivamvashisth.com/case-studies/${cs.slug}/`,
    },
  })),
};

export default function CaseStudiesIndex() {
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

      <section className="mb-12" data-reveal>
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-acc-lavender">
          Case studies
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          The harder pipelines, <span className="ink-underline">end to end</span>
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          Every pipeline I ship has a public, genericized repo. These are the write-ups behind the
          hardest ones: the problem, the design decision that actually mattered, and the platform
          quirk that would have quietly broken it.
        </p>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Anonymized on purpose: the channels are real, the client is not named, and every number
          here is one already stated in the linked repo&apos;s own README.
        </p>
      </section>

      <div className="space-y-8 sm:space-y-10">
        {CASE_STUDIES.map((cs, i) => {
          const nn = String(i + 1).padStart(2, "0");
          return (
            <article
              key={cs.slug}
              data-reveal
              className="relative rounded-3xl border border-line bg-card p-6 shadow-sm sm:p-8"
            >
              <p className="mb-1 font-mono text-[13px] font-semibold uppercase tracking-widest text-acc-lavender">
                {nn} · {cs.readMinutes} min read
              </p>
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                <Link href={`/case-studies/${cs.slug}/`} className="hover:underline">
                  {cs.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{cs.dek}</p>

              <div className="mt-4 flex flex-wrap gap-4">
                {cs.stats.map((s) => (
                  <div key={s.label} className="font-mono">
                    <span className="text-lg font-semibold text-ink">{s.value}</span>{" "}
                    <span className="text-xs text-ink-faint">{s.label}</span>
                  </div>
                ))}
              </div>

              <Link
                href={`/case-studies/${cs.slug}/`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
              >
                Read the case study →
              </Link>
            </article>
          );
        })}
      </div>

      <div className="mt-12" data-reveal>
        <SubscribeBox
          source="case-studies"
          kicker="More landing soon"
          title="Want the next case study when it ships?"
          blurb="Leave your email. One short note when a new write-up lands here, nothing else."
          cta="Keep me posted"
          success="Done. You'll hear about the next one first ✓"
        />
      </div>

      <footer className="mt-12 border-t border-line pt-6 text-sm text-ink-faint">
        <p>
          Written by{" "}
          <a className="text-acc-sky" href="https://www.instagram.com/svx2027" target="_blank" rel="noopener noreferrer">
            Shivam Vashisth
          </a>
          . Every repo linked above is public and open source.
        </p>
      </footer>
    </div>
  );
}
