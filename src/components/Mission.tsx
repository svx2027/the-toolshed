const TRIAD = [
  { k: "01", line: "The tool is free.", sub: "Sitting on GitHub, ready for anyone on earth." },
  { k: "02", line: "The talent is real.", sub: "Creatives here are every bit as capable." },
  { k: "03", line: "The bridge was never built.", sub: "Nobody handed them the words to cross it." },
];

export function Mission() {
  return (
    <section id="mission" className="scroll-mt-28 border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="t-kicker">Why this exists</p>
        <h2 className="t-h2 mt-4 max-w-[14ch] text-[clamp(40px,6.5vw,80px)] text-ink">
          Creatives don&rsquo;t lack talent. They lack the words.
        </h2>

        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
          {TRIAD.map((t) => (
            <div key={t.k} className="bg-card p-6">
              <span className="font-mono text-[12px] text-ink-faint">{t.k}</span>
              <p className="t-h3 mt-3 text-[26px] text-ink">{t.line}</p>
              <p className="mt-2 text-[15px] text-ink-soft">{t.sub}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-[18px] leading-relaxed text-ink-soft">
          Right now, someone in Sweden is building something brilliant and putting it on GitHub, free, for anyone on
          earth to use. A creator sitting here could grow with that exact tool. They never will. Not for lack of
          talent, but because no one gave them the vocabulary to find it, run it, and bend it to their work. I&rsquo;m
          not here to build your tools for you. I&rsquo;m here to hand you the words, so you teach yourself, about 10x
          faster than guessing in the dark.
        </p>
        <p className="t-h3 mt-8 text-[clamp(24px,3.2vw,36px)] text-ink">
          Give a creator the words, and they cross the bridge on their own.
        </p>
      </div>
    </section>
  );
}
