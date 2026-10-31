import { Jargon } from "./Jargon";
import { Showdown } from "./Showdown";
import { OutlierFigure } from "./OutlierFigure";

export function Hero() {
  return (
    <header id="top" className="scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-14">
          <div>
            <p className="t-kicker">
              <i aria-hidden className="mr-2 inline-block h-2 w-2 rounded-full bg-lose align-[1px]" />
              Hi, I&rsquo;m Shivam
            </p>

            <h1 className="t-display mt-5 text-[clamp(56px,10vw,120px)] text-ink">
              You don&rsquo;t need to be a coder.
            </h1>

            <p className="t-kicker mt-6">Code for creatives, creators</p>

            <p className="mt-4 max-w-xl text-[18px] leading-relaxed text-ink-soft">
              <strong className="font-semibold text-ink">Code for Creatives India.</strong>{" "}
              I&rsquo;m a YouTube strategist who builds tiny apps with AI: no dev team, no CS degree. If you can write a{" "}
              <Jargon term="prompt">prompt</Jargon>, you can build one too. Build it once, and it works while you
              sleep. That is <a href="#leverage" className="text-acc underline underline-offset-4">leverage</a>.
            </p>

            {/* two doors: do, or stay */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#toolshed" className="btn">
                Open the Garage
              </a>
              <a
                href="https://instagram.com/svx2027"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Follow the build <span aria-hidden className="text-ink-faint">↗</span>
              </a>
            </div>

            <p className="mt-5 text-[13px] text-ink-faint">
              Tip: tap any underlined word (like <Jargon term="prompt">prompt</Jargon>) for plain English.
            </p>

            <div className="strap mt-10">
              <b>Shivam Vashisth</b>
              <span>YouTube strategist. Builds tiny apps with AI. Replies to every DM himself.</span>
            </div>
          </div>

          <Showdown />
        </div>
      </div>

      <OutlierFigure />
    </header>
  );
}
