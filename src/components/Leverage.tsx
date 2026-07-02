import { Reveal } from "./Reveal";

// Real quotes only, verbatim, from people who defined the idea of leverage.
// (Third-party quotes are quoted material; site copy around them follows house voice.)
const QUOTES = [
  {
    quote: "Give me a lever long enough and a place to stand, and I will move the world.",
    who: "Archimedes",
    what: "the oldest note ever written on leverage",
  },
  {
    quote:
      "Code and media are permissionless leverage. They’re the leverage behind the newly rich. You can create software and media that works for you while you sleep.",
    who: "Naval Ravikant",
    what: "investor, from the How to Get Rich thread",
  },
  {
    quote:
      "The computer is the most remarkable tool that we’ve ever come up with. It’s the equivalent of a bicycle for our minds.",
    who: "Steve Jobs",
    what: "on why this particular lever is different",
  },
];

export function Leverage() {
  return (
    <section id="leverage" className="relative z-10 mx-auto max-w-5xl scroll-mt-24 px-5 py-24 sm:px-7 sm:py-32">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">The point of all this</p>
        <h2 className="mt-2 max-w-3xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-6xl">
          Leverage: work that earns while you sleep.
        </h2>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Every tool in the Garage earns its keep the same way: you build it once, and it keeps working. It answers the
          same question a thousand times, reaches people you have never met, and never asks for overtime. That is
          leverage. It used to belong to people with dev teams and funding. AI just handed it to anyone who can write a
          clear sentence.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-8 sm:grid-cols-3">
        {QUOTES.map((q, i) => (
          <Reveal key={q.who} delay={i * 0.08}>
            <figure className="flex h-full flex-col border-t border-line-strong pt-5">
              <span aria-hidden className="font-display text-5xl leading-none text-acc-lavender">
                &ldquo;
              </span>
              <blockquote className="mt-1 font-display text-xl font-medium leading-snug text-ink sm:text-[1.35rem]">
                {q.quote}
              </blockquote>
              <figcaption className="mt-auto pt-5">
                <p className="font-mono text-sm text-ink">{q.who}</p>
                <p className="mt-0.5 text-sm text-ink-faint">{q.what}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-16 max-w-3xl font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
          You bring the taste. AI brings the heavy lifting.
        </p>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          That is the plan here: 10x what you can ship, keep your name on it, and let the work pay you back. Not a
          hustle. A lever.
        </p>
      </Reveal>
    </section>
  );
}
