import { Jargon } from "./Jargon";
import { Showdown } from "./Showdown";

export function Hero() {
  return (
    <header id="top" className="relative z-10 mx-auto max-w-6xl px-5 pt-28 pb-10 sm:px-7 sm:pt-32">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">Hi, I&rsquo;m Shivam</p>

          <h1 className="mt-3 font-display text-5xl font-medium leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            <span className="ink-underline">You don&rsquo;t need to be a coder.</span>
          </h1>

          <p className="mt-6 font-mono text-xs uppercase tracking-[0.22em] text-ink-faint">
            Code for creatives&nbsp;·&nbsp;creators
          </p>

          <p className="mt-4 max-w-xl text-lg text-ink-soft">
            <strong className="font-semibold text-ink">Code for Creatives India.</strong>{" "}
            I&rsquo;m a YouTube strategist who builds tiny apps with AI: no dev team, no CS degree. If you can write a{" "}
            <Jargon term="prompt">prompt</Jargon>, you can build one too. I&rsquo;ll show you how.
          </p>

          {/* two doors: do, or stay */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#toolshed"
              className="cta-glow inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-medium text-paper transition-transform hover:-translate-y-0.5"
            >
              Open the Garage
            </a>
            <a
              href="https://instagram.com/svx2027"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-6 py-3 font-medium text-ink transition-colors hover:border-ink"
            >
              Follow the build <span aria-hidden className="text-ink-faint">↗</span>
            </a>
          </div>

          <p className="mt-5 text-[0.82rem] text-ink-faint">
            Tip: tap any underlined word (like <Jargon term="prompt">prompt</Jargon>) for plain English.
          </p>
        </div>

        <div>
          <Showdown />
        </div>
      </div>

      <p className="mt-16 text-center font-mono text-sm text-ink-faint">↓ scroll to the mission</p>
    </header>
  );
}
