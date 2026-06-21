import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Garage } from "@/components/Garage";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RevealController } from "@/components/RevealController";
import { Jargon } from "@/components/Jargon";
import { ContactForm } from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <RevealController />
      <Nav />
      <main>
        <Hero />

        {/* ---------- MISSION ---------- */}
        <section id="mission" className="relative z-10 mx-auto max-w-3xl scroll-mt-24 px-5 py-24 sm:px-7 sm:py-32">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">The mission</p>
            <h2 className="mt-2 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">Where it breaks</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 text-lg text-ink-soft">
              Right now, someone in Sweden is building something brilliant and putting it on{" "}
              <Jargon term="github">GitHub</Jargon>, free, for anyone on earth to use. A creator sitting here could
              grow with that exact tool. They never will.
            </p>
          </Reveal>
          <Reveal>
            <p className="mt-5 text-ink-soft">
              Not because they lack the talent. Because nobody gave them the words. What GitHub is. How to actually
              run the thing once you find it. How a <Jargon term="skill">skill</Jargon> in Claude could quietly do half
              your work. The tool is free. The talent is real. The bridge between them was never built, so it sits
              there, useless to the people who need it most, while their growth stalls in silence.
            </p>
          </Reveal>
          <Reveal>
            <p className="mt-5 text-ink-soft">
              That is the gap I care about, and it is the whole reason this exists. I am not here to build your tools
              for you. I am here to hand you the vocabulary: enough words to open a real conversation with AI, ask the
              right next question, and then teach yourself, about ten times faster than guessing in the dark.
            </p>
          </Reveal>
          <Reveal>
            <p className="mt-8 border-t border-line pt-6 font-display text-2xl leading-snug text-ink">
              Give a creator the words, and they cross the bridge on their own.
            </p>
          </Reveal>
        </section>

        {/* ---------- THE GARAGE ---------- */}
        <Garage />

        {/* ---------- CASE STUDIES ---------- */}
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
                    <em>is</em> the marketing.
                  </>
                ),
                skip: "server-side image rendering. The browser draws it; nothing leaves your device.",
              },
              {
                h: "Privacy by default",
                body: (
                  <>
                    Life in Weeks never sends your birthday anywhere. Aligned encodes its quiz state in the URL, so two
                    people can play with zero <Jargon term="backend">backend</Jargon>.
                  </>
                ),
                skip: "accounts and tracking, until an app genuinely needs them.",
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
        <section id="about" className="relative z-10 mx-auto max-w-3xl scroll-mt-24 px-5 py-24 sm:px-7 sm:py-32">
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
              realised creators everywhere fight the same grind.
            </p>
          </Reveal>
          <Reveal>
            <p className="mt-5 text-ink-soft">
              So I started Code for Creatives India: tiny apps anyone can build with AI, no dev team, no degree. I
              learned to do this with AI doing the heavy lifting, which means the judgment of <em>what</em> to build
              matters far more than the code. I&rsquo;m documenting the whole thing on{" "}
              <a href="https://instagram.com/svx2027" target="_blank" rel="noopener noreferrer" className="text-acc-sky underline-offset-2 hover:underline">
                Instagram
              </a>
              .
            </p>
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
              <p className="mx-auto mt-4 max-w-md text-ink-soft">
                No funnel, no auto-DM, no growth hack. Ask me anything on Instagram and I answer it myself. In a feed
                full of automation, that is the whole trust pitch.
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

        {/* ---------- CONTACT ---------- */}
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
                    Leave your email and I&rsquo;ll send the next app the day it goes live. No spam, just tools.
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
