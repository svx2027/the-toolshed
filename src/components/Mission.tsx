import { Reveal } from "./Reveal";

const TRIAD = [
  { k: "01", line: "The tool is free.", sub: "Sitting on GitHub, ready for anyone on earth." },
  { k: "02", line: "The talent is real.", sub: "Creators here are every bit as capable." },
  { k: "03", line: "The bridge was never built.", sub: "Nobody handed them the words to cross it." },
];

export function Mission() {
  return (
    <section
      id="mission"
      className="relative z-10 scroll-mt-20 bg-ink py-24 text-paper sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-7">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-paper/50">Why this exists</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl">
            Creators don&rsquo;t lack talent. They lack the words.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {TRIAD.map((t, i) => (
            <Reveal key={t.k} delay={i * 0.08}>
              <div className="border-t border-paper/20 pt-5">
                <span className="font-mono text-sm text-paper/40">{t.k}</span>
                <p className="mt-2 font-display text-2xl font-medium leading-snug sm:text-[1.7rem]">{t.line}</p>
                <p className="mt-2 text-sm text-paper/60">{t.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-14 max-w-2xl text-lg leading-relaxed text-paper/75">
            Right now, someone in Sweden is building something brilliant and putting it on GitHub, free, for anyone on
            earth to use. A creator sitting here could grow with that exact tool. They never will — not for lack of
            talent, but because no one gave them the vocabulary to find it, run it, and bend it to their work. I&rsquo;m
            not here to build your tools for you. I&rsquo;m here to hand you the words, so you teach yourself, about ten
            times faster than guessing in the dark.
          </p>
        </Reveal>

        <Reveal>
          <p className="mt-12 max-w-4xl font-display text-3xl font-medium leading-tight tracking-tight sm:text-5xl">
            Give a creator the words, and they cross the bridge on their own.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
