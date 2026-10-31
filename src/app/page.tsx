import { Nav } from "@/components/Nav";
import { ChapterRail } from "@/components/ChapterRail";
import { Hero } from "@/components/Hero";
import { AudienceMarquee } from "@/components/AudienceMarquee";
import { Mission } from "@/components/Mission";
import { Leverage } from "@/components/Leverage";
import { Garage } from "@/components/Garage";
import { StartHere } from "@/components/StartHere";
import { Faq } from "@/components/Faq";
import { ResourceIndex } from "@/components/ResourceIndex";
import { Footer } from "@/components/Footer";
import { Jargon } from "@/components/Jargon";
import { ContactForm } from "@/components/ContactForm";
import { FAQ_ITEMS } from "@/lib/faq";

// FAQPage schema: search engines get the same answers the Help section renders.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const NOTES = [
  {
    h: "This very site",
    body: (
      <>
        Rebuilt on Next.js and React, so the navigation and the one 3D figure are real code, not a template. A shared{" "}
        <Jargon term="canvas">canvas</Jargon> engine still draws the share-cards, and the whole look is a handful of
        design tokens.
      </>
    ),
    skip: "a database and a CMS. The little tools are still just plain files.",
  },
  {
    h: "The share-card pattern",
    body: (
      <>
        Every app exports a 1080×1920 <Jargon term="png">PNG</Jargon> from one reusable{" "}
        <Jargon term="canvas">canvas</Jargon> function. Build it once, reuse it everywhere: the card <em>is</em> the
        marketing.
      </>
    ),
    skip: "server-side rendering. The browser draws it; nothing leaves your device.",
  },
  {
    h: "Privacy by default",
    body: (
      <>
        Life in Weeks never sends your birthday anywhere. Aligned encodes its quiz state in the URL, so two people can
        play with zero <Jargon term="backend">backend</Jargon>.
      </>
    ),
    skip: "creepy tracking. I count anonymous page views and prompt copies, no cookies, no profiles, no selling. The only personal thing I store is an email you hand me on purpose.",
  },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Nav />
      <main>
        {/* the fixed top bar's height, then the chapter rail sticks right under it */}
        <div className="h-14" />
        <ChapterRail />

        <Hero />

        {/* ---------- WHO IT'S FOR ---------- */}
        <AudienceMarquee />

        {/* ---------- MISSION (the site's purpose) ---------- */}
        <Mission />

        {/* ---------- LEVERAGE (why it pays: the mission's money half) ---------- */}
        <Leverage />

        {/* ---------- THE GARAGE ---------- */}
        <Garage />

        {/* ---------- START HERE (the words, handed over) ---------- */}
        <StartHere />

        {/* ---------- BUILD NOTES (already a rule-of-three) ---------- */}
        <section id="cases" className="scroll-mt-28 border-b border-line">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <p className="t-kicker">Build notes</p>
            <h2 className="t-h2 mt-4 max-w-[16ch] text-[clamp(40px,6.5vw,80px)] text-ink">
              Three things I built (and what I skipped)
            </h2>
            <div className="mt-10 grid gap-px border border-line bg-line lg:grid-cols-3">
              {NOTES.map((c, i) => (
                <article key={c.h} className="flex h-full flex-col bg-card p-6">
                  <span className="font-mono text-[12px] text-ink-faint">S1.E{i + 1}</span>
                  <h3 className="t-h3 mt-3 text-[26px] text-ink">{c.h}</h3>
                  <p className="mt-3 flex-1 text-[15px] text-ink-soft">{c.body}</p>
                  <p className="mt-5 border-t border-line pt-3 text-[13px] text-ink-faint">
                    <strong className="font-semibold text-ink-soft">Skipped:</strong> {c.skip}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-[15px] text-ink-faint">
              Longer write-ups, with numbers:{" "}
              <a href="/case-studies/" className="text-acc underline underline-offset-4">
                case studies
              </a>
              .
            </p>
          </div>
        </section>

        {/* ---------- ABOUT ---------- */}
        <section id="about" className="scroll-mt-28 border-b border-line">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="t-kicker">About</p>
              <h2 className="t-h2 mt-4 text-[clamp(40px,6.5vw,80px)] text-ink">If I can do this, you can too</h2>
            </div>
            <div>
              <p className="text-[18px] leading-relaxed text-ink-soft">
                By day I&rsquo;m a YouTube strategist, deep in content and data: competitive intelligence for education
                channels, transcripts, market numbers. I kept building little tools to make the grind less manual, then
                realised creatives and creators everywhere fight the same grind. The strategy work and its results are
                at{" "}
                <a href="https://yt.shivamvashisth.com" target="_blank" rel="noopener noreferrer" className="text-acc underline underline-offset-4">
                  yt.shivamvashisth.com
                </a>
                .
              </p>
              <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
                So I started Code for Creatives India: tiny apps anyone can build with AI, no dev team, no degree.
                It&rsquo;s for creatives and creators both. Writers, musicians, designers, comics, journalists, YouTubers.
                Anyone who makes and ships their own work. I learned to do this with AI doing the heavy lifting, which
                means the judgment of <em>what</em> to build matters far more than the code. I&rsquo;m documenting the
                whole thing on{" "}
                <a href="https://instagram.com/svx2027" target="_blank" rel="noopener noreferrer" className="text-acc underline underline-offset-4">
                  Instagram
                </a>
                .
              </p>
              <div className="strap mt-8">
                <b>Shivam Vashisth</b>
                <span>svx2027</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- TRUST ---------- */}
        <section id="reply" className="scroll-mt-28 border-b border-line">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <p className="t-kicker">Trust</p>
            <h2 className="t-h2 mt-4 text-[clamp(40px,6.5vw,80px)] text-ink">I actually reply.</h2>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-soft">
              <span>No funnel.</span>
              <span>No growth hack.</span>
              <span>No bot pretending to be me.</span>
            </div>
            <p className="mt-5 max-w-2xl text-[17px] text-ink-soft">
              One robot sends you the free link when you comment. That is the only automation here. Every real reply,
              every actual conversation, is me by hand. In a feed full of fake, that is the whole trust pitch.
            </p>
            <a href="https://instagram.com/svx2027" target="_blank" rel="noopener noreferrer" className="btn mt-7">
              DM me on Instagram
            </a>
          </div>
        </section>

        {/* ---------- HELP (fair questions, straight answers) ---------- */}
        <Faq />

        {/* ---------- FREE RESOURCES (the drop index: every IG link lives here too) ---------- */}
        <ResourceIndex />

        {/* ---------- CONTACT (Three ways to stick around) ---------- */}
        <section id="contact" className="scroll-mt-28 border-b border-line">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <p className="t-kicker">Stick around</p>
            <h2 className="t-h2 mt-4 text-[clamp(40px,6.5vw,80px)] text-ink">Three ways to stick around</h2>
            <div className="mt-10 grid gap-px border border-line bg-line lg:grid-cols-3">
              <div className="bg-card p-6">
                <span className="font-mono text-[12px] text-ink-faint">01</span>
                <h3 className="t-h3 mt-3 text-[26px] text-ink">Bookmark the Garage</h3>
                <p className="mt-2 text-[15px] text-ink-soft">It restocks every week. Ctrl+D, or Cmd+D on Mac, and come back.</p>
              </div>
              <div className="bg-card p-6">
                <span className="font-mono text-[12px] text-ink-faint">02</span>
                <h3 className="t-h3 mt-3 text-[26px] text-ink">Get the drop</h3>
                <p className="mt-2 text-[15px] text-ink-soft">
                  One email when a new tool goes live. Most weeks one, sometimes none. No funnel, no list rental, just
                  the same inbox I reply to.
                </p>
                <ContactForm />
              </div>
              <div className="bg-card p-6">
                <span className="font-mono text-[12px] text-ink-faint">03</span>
                <h3 className="t-h3 mt-3 text-[26px] text-ink">Follow the build</h3>
                <p className="mt-2 text-[15px] text-ink-soft">
                  <a href="https://instagram.com/svx2027" target="_blank" rel="noopener noreferrer" className="text-acc underline underline-offset-4">
                    @svx2027
                  </a>{" "}
                  on Instagram, where I show the messy middle and reply to every DM myself. No bots, no VA.
                  That&rsquo;s me.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
