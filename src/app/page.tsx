import { Nav } from "@/components/Nav";
import { KoiPond } from "@/components/KoiPond";
import { Hero } from "@/components/Hero";
import { AudienceMarquee } from "@/components/AudienceMarquee";
import { Mission } from "@/components/Mission";
import { Leverage } from "@/components/Leverage";
import { Garage } from "@/components/Garage";
import { StartHere } from "@/components/StartHere";
import { Faq } from "@/components/Faq";
import { ResourceIndex } from "@/components/ResourceIndex";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RevealController } from "@/components/RevealController";
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

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <KoiPond />
      <RevealController />
      <Nav />
      <main>
        <Hero />

        {/* ---------- WHO IT'S FOR (slow ticker) ---------- */}
        <AudienceMarquee />

        {/* ---------- MISSION (featured manifesto, the site's purpose) ---------- */}
        <Mission />

        {/* ---------- LEVERAGE (why it pays: the mission's money half) ---------- */}
        <Leverage />

        {/* ---------- THE GARAGE ---------- */}
        <Garage />

        {/* ---------- START HERE (the words, handed over) ---------- */}
        <StartHere />

        {/* ---------- CASE STUDIES (already a rule-of-three) ---------- */}
        <section id="cases" className="relative z-10 mx-auto max-w-6xl px-5 py-12 sm:px-7">
          <Reveal className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">Build notes</p>
            <h2 className="mt-2 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
              Three things I built (and what I skipped)
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              {
                h: "This very site",
                body: (
                  <>
                    Rebuilt on Next.js, React and Framer Motion, so the navigation and every scroll transition are
                    real motion. A shared <Jargon term="canvas">canvas</Jargon> engine still draws the share-cards, and
                    the whole look is a handful of design tokens.
                  </>
                ),
                skip: "a database and a CMS. The little tools are still just plain files.",
              },
              {
                h: "The share-card pattern",
                body: (
                  <>
                    Every app exports a 1080×1920 <Jargon term="png">PNG</Jargon> from one reusable{" "}
                    <Jargon term="canvas">canvas</Jargon> function. Build it once, reuse it everywhere: the card{" "}
                    <em>is</em>{" "}the marketing.
                  </>
                ),
                skip: "server-side rendering. The browser draws it; nothing leaves your device.",
              },
              {
                h: "Privacy by default",
                body: (
                  <>
                    Life in Weeks never sends your birthday anywhere. Aligned encodes its quiz state in the URL, so two
                    people can play with zero <Jargon term="backend">backend</Jargon>.
                  </>
                ),
                skip: "creepy tracking. I count anonymous page views and prompt copies, no cookies, no profiles, no selling. The only personal thing I store is an email you hand me on purpose.",
              },
            ].map((c, i) => (
              <Reveal key={c.h} delay={i * 0.06}>
                <article className="h-full rounded-3xl border border-line bg-card p-7 shadow-sm">
                  <h3 className="font-display text-xl font-medium text-ink">{c.h}</h3>
                  <p className="mt-3 text-ink-soft">{c.body}</p>
                  <p className="mt-4 text-sm text-ink-faint">
                    <strong className="text-ink-soft">Skipped:</strong> {c.skip}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- ABOUT ---------- */}
        <section id="about" className="relative isolate z-10 mx-auto max-w-3xl scroll-mt-24 overflow-hidden px-5 py-24 sm:px-7 sm:py-32">
          {/* maker's mark, buried in the background (centered + sized to fit, never clipped) */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-8 -z-10 select-none text-center font-display text-[clamp(3rem,16vw,8.5rem)] font-semibold leading-none tracking-tight text-ink/[0.05]"
          >
            svx2027
          </span>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">About</p>
            <h2 className="mt-2 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
              If I can do this, you can too
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 text-lg text-ink-soft">
              By day I&rsquo;m a YouTube strategist, deep in content and data: competitive intelligence for education
              channels, transcripts, market numbers. I kept building little tools to make the grind less manual, then
              realised creatives and creators everywhere fight the same grind.
            </p>
          </Reveal>
          <Reveal>
            <p className="mt-5 text-ink-soft">
              So I started Code for Creatives India: tiny apps anyone can build with AI, no dev team, no degree.
              It&rsquo;s for creatives and creators both. Writers, musicians, designers, comics, journalists, YouTubers.
              Anyone who makes and ships their own work. I learned to do this with AI doing the heavy lifting, which
              means the judgment of <em>what</em>{" "}to build matters far more than the code. I&rsquo;m documenting the
              whole thing on{" "}
              <a href="https://instagram.com/svx2027" target="_blank" rel="noopener noreferrer" className="text-acc-sky underline-offset-2 hover:underline">
                Instagram
              </a>
              .
            </p>
          </Reveal>
          <Reveal>
            <p className="mt-8 font-display text-2xl italic text-ink">Shivam Vashisth</p>
          </Reveal>
        </section>

        {/* ---------- TRUST ---------- */}
        <section id="reply" className="relative z-10 mx-auto max-w-2xl px-5 py-12 sm:px-7">
          <Reveal>
            <div className="rounded-3xl border border-line bg-card p-8 text-center shadow-sm sm:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">Trust</p>
              <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                I actually reply.
              </h2>
              <div className="mx-auto mt-5 flex max-w-md flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
                <span>No funnel.</span>
                <span aria-hidden className="text-ink-faint">·</span>
                <span>No growth hack.</span>
                <span aria-hidden className="text-ink-faint">·</span>
                <span>No bot pretending to be me.</span>
              </div>
              <p className="mx-auto mt-4 max-w-md text-ink-soft">
                One robot sends you the free link when you comment. That is the only automation here. Every real reply,
                every actual conversation, is me by hand. In a feed full of fake, that is the whole trust pitch.
              </p>
              <a
                href="https://instagram.com/svx2027"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 font-medium text-paper transition-transform hover:-translate-y-0.5"
              >
                DM me on Instagram
              </a>
            </div>
          </Reveal>
        </section>

        {/* ---------- HELP (fair questions, straight answers) ---------- */}
        <Faq />

        {/* ---------- FREE RESOURCES (the drop index: every IG link lives here too) ---------- */}
        <ResourceIndex />

        {/* ---------- CONTACT (Three ways to stick around) ---------- */}
        <section id="contact" className="relative z-10 mx-auto max-w-2xl scroll-mt-24 px-5 py-24 sm:px-7 sm:py-28">
          <Reveal>
            <div className="rounded-3xl border border-line bg-card p-8 shadow-sm sm:p-10">
              <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">Stick around</p>
              <h2 className="mt-2 text-center font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                Three ways to stick around
              </h2>
              <div className="mt-8 space-y-7">
                <div className="border-b border-line pb-7">
                  <h3 className="font-display text-lg font-medium text-ink">Bookmark the Garage</h3>
                  <p className="mt-1 text-ink-soft">It restocks every week. Ctrl+D, or Cmd+D on Mac, and come back.</p>
                </div>
                <div className="border-b border-line pb-7">
                  <h3 className="font-display text-lg font-medium text-ink">Get the drop</h3>
                  <p className="mt-1 text-ink-soft">
                    One email when a new tool goes live. Most weeks one, sometimes none. No funnel, no list rental, just
                    the same inbox I reply to.
                  </p>
                  <ContactForm />
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium text-ink">Follow the build</h3>
                  <p className="mt-1 text-ink-soft">
                    <a href="https://instagram.com/svx2027" target="_blank" rel="noopener noreferrer" className="text-acc-sky underline-offset-2 hover:underline">
                      @svx2027
                    </a>{" "}
                    on Instagram, where I show the messy middle and reply to every DM myself. No bots, no VA.
                    That&rsquo;s me.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
