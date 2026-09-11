import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/caseStudies";
import { RevealController } from "@/components/RevealController";
import { SubscribeBox } from "@/components/SubscribeBox";

export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

function findCaseStudy(slug: string) {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = findCaseStudy(slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.dek,
    alternates: { canonical: `/case-studies/${cs.slug}/` },
    openGraph: {
      type: "article",
      title: cs.title,
      description: cs.dek,
      url: `/case-studies/${cs.slug}/`,
      images: ["/assets/og-home.png"],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = findCaseStudy(slug);
  if (!cs) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.dek,
    url: `https://shivamvashisth.com/case-studies/${cs.slug}/`,
    datePublished: cs.dated,
    author: { "@type": "Person", name: "Shivam Vashisth" },
  };

  return (
    <div className="relative z-10 mx-auto max-w-3xl px-5 pb-20 pt-8 sm:px-8">
      <RevealController />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <header className="mb-12 flex items-center justify-between text-sm">
        <Link href="/case-studies/" className="font-medium text-ink-soft hover:text-ink">
          ← Case studies
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

      <section className="mb-10" data-reveal>
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-acc-lavender">
          Case study · {cs.dated} · {cs.readMinutes} min read
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          {cs.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">{cs.dek}</p>

        <a
          href={cs.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-ink-soft transition-transform hover:-translate-y-0.5 hover:text-ink"
        >
          {cs.repoName}
          <span aria-hidden>↗</span>
        </a>
      </section>

      <section
        className="mb-12 grid grid-cols-2 gap-4 rounded-2xl bg-sky/60 p-5 dark:bg-card dark:border dark:border-line sm:grid-cols-3"
        data-reveal
      >
        {cs.stats.map((s) => (
          <div key={s.label}>
            <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">{s.value}</p>
            <p className="mt-1 text-xs leading-snug text-ink-soft">{s.label}</p>
          </div>
        ))}
      </section>

      <div className="space-y-10">
        {cs.sections.map((s) => (
          <section key={s.heading} data-reveal>
            <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
              {s.heading}
            </h2>
            <div className="mt-3 space-y-4">
              {s.body.map((p, i) => (
                <p key={i} className="leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-12 rounded-2xl border border-line bg-card p-6" data-reveal>
        <h2 className="font-display text-lg font-semibold text-ink">Honest scope</h2>
        <ul className="mt-3 space-y-2">
          {cs.honestScope.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
              <span aria-hidden className="text-ink-faint">
                →
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" data-reveal>
        <h2 className="font-display text-xl font-semibold text-ink">Read the code</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          The full engine behind this write-up is public and open source at{" "}
          <a
            href={cs.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-acc-sky underline-offset-2 hover:underline"
          >
            {cs.repoName}
          </a>
          , with its own README, architecture diagram, and test suite.
        </p>
      </section>

      <div className="mt-12" data-reveal>
        <SubscribeBox
          source={`case-study-${cs.slug}`}
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
          . Anonymized: real channels, no client named.
        </p>
      </footer>
    </div>
  );
}
