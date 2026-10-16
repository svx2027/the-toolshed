import type { Metadata } from "next";
import Link from "next/link";
import { RevealController } from "@/components/RevealController";
import { SubscribeBox } from "@/components/SubscribeBox";

const TITLE = "How this portfolio builds itself";
const DEK =
  "A daily, unattended agent turns real client work into sanitized public repos, and nothing reaches GitHub until three independent passes agree it is safe and real.";

export const metadata: Metadata = {
  title: TITLE,
  description: DEK,
  alternates: { canonical: "/how-this-portfolio-builds-itself/" },
  openGraph: {
    type: "article",
    title: TITLE,
    description: DEK,
    url: "/how-this-portfolio-builds-itself/",
    images: ["/assets/og-home.png"],
  },
};

const STATS = [
  { value: "78", label: "days this has run, one real gated unit of work (a port, a fix, a doc pass) on almost every one" },
  { value: "14", label: "public repos it has built or now maintains this way" },
  { value: "3", label: "independent roles that all have to agree before a single push" },
];

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "The thing worth showing is the thing that can't go public",
    body: [
      "Most of the interesting engineering I do lives in private client repos: real channel data, real names, real numbers. None of that can ever be public, and it shouldn't be. But \"trust me, I built something good\" is a worse portfolio than actually showing the work. The resolution isn't picking one side. It's a repeatable process that takes a private, client-specific tool and produces a public, client-free one that is still honestly the same engineering, run every day by an agent instead of by hand.",
    ],
  },
  {
    heading: "Four steps, no shortcuts",
    body: [
      "Every port follows the same four steps, in order, and no file skips the queue: scope every file in the source as code that generalizes, documentation that needs rewriting, demo data that needs inventing from scratch, or output that never leaves the private side at all. Convert what's left: rename anything identifying, rewrite every doc top to bottom rather than find-and-replacing a name, and write a README that tells a stranger in under a minute what the tool does and what it honestly doesn't do yet. Gate it. Then, only if the gate passes, it ships.",
    ],
  },
  {
    heading: "Three roles, because one script grading itself proves nothing",
    body: [
      "The gate is three separate passes, and all three have to come back clean before anything public happens. One pass is purely mechanical: grep every banned term, check for secrets, check file sizes, confirm tests pass. It is fast and it is exhaustive, but it can only catch what it was already told to look for. A second pass assumes the first one missed something, on purpose. Its only job is to ask: could a motivated reader work out who the client is, or recognize a real person, from this repo alone? That's a different kind of check than a keyword search, since it catches a shape, a combination of ordinary-looking facts, or a demo value that just happens to echo something real, not a banned word. A third pass ignores sanitization completely and asks the question a hiring manager actually cares about: is this real, finished work, explained plainly, worth the reader's five minutes?",
      "Any one of the three can block the push by itself. More than once, the adversarial pass has caught something the mechanical one is structurally unable to see, not a banned word, but a pattern specific enough to narrow down who the work was really for, and sent it back for a rewrite before a single public commit happened.",
    ],
  },
  {
    heading: "Independence is the whole point, not a nice-to-have",
    body: [
      "The second and third passes only mean something if they don't already know what the first one concluded. So each one runs as a separate, fresh pass with nothing but the candidate content and its own brief: no shared notes, no \"here's what already got flagged.\" A check that already knows the answer it's supposed to be checking for isn't a check.",
    ],
  },
  {
    heading: "When it's genuinely unsure, it stops",
    body: [
      "The agent that runs this daily has one hard rule above all the others: never guess through a sanitization doubt. If a gate fails twice on the same thing, or a question has no safe default answer, it writes exactly what it needs down in a private, running log and moves on to something it can actually finish that day. A person reads that log and decides. Guessing wrong here isn't a bug to fix later, it's the one mistake this whole process exists to prevent.",
    ],
  },
  {
    heading: "What that adds up to",
    body: [
      "Running daily since late July, this process has shipped and now maintains 14 public repos (plus the profile page tying them together), each one a client-free rebuild of something that started as real, paid engineering work. The private originals, and the log of every decision made while converting them, stay private forever. What's public is never the client's work with the names swapped out, it's the same engineering problem, solved again from scratch, for anyone to read.",
    ],
  },
];

const HONEST_SCOPE = [
  "The adversarial pass is thorough, not infallible. It is a second independent read, not a guarantee that nothing was ever missed, which is exactly why nothing here claims zero risk, only a real, repeated, working check.",
  "This process itself is run by the same kind of unattended daily agent every other repo in this portfolio describes. That isn't a metaphor, it's the literal build log behind this page.",
  "None of this replaces judgment. Anything the process can't resolve on its own goes to a person, on purpose, rather than being guessed through.",
];

export default function HowThisPortfolioBuildsItself() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DEK,
    url: "https://shivamvashisth.com/how-this-portfolio-builds-itself/",
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

      <section className="mb-10" data-reveal>
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-acc-lavender">
          How it works
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          {TITLE}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">{DEK}</p>
      </section>

      <section
        className="mb-12 grid grid-cols-1 gap-4 rounded-2xl bg-sky/60 p-5 dark:bg-card dark:border dark:border-line sm:grid-cols-3"
        data-reveal
      >
        {STATS.map((s) => (
          <div key={s.label}>
            <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">{s.value}</p>
            <p className="mt-1 text-xs leading-snug text-ink-soft">{s.label}</p>
          </div>
        ))}
      </section>

      <div className="space-y-10">
        {SECTIONS.map((s) => (
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
          {HONEST_SCOPE.map((item, i) => (
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
        <h2 className="font-display text-xl font-semibold text-ink">See it running</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Every repo linked from{" "}
          <a
            href="https://github.com/svx2027"
            target="_blank"
            rel="noopener noreferrer"
            className="text-acc-sky underline-offset-2 hover:underline"
          >
            my GitHub profile
          </a>{" "}
          went through this same four-step, three-role process, and the case studies on this
          site walk through a few of the harder ones end to end.
        </p>
      </section>

      <div className="mt-12" data-reveal>
        <SubscribeBox
          source="how-this-portfolio-builds-itself"
          kicker="More landing soon"
          title="Want the next write-up when it ships?"
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
          . Anonymized: real clients, no client named.
        </p>
      </footer>
    </div>
  );
}
