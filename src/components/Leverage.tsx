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
    <section id="leverage" className="scroll-mt-28 border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="t-kicker">The point of all this</p>
        <h2 className="t-h2 mt-4 max-w-[16ch] text-[clamp(40px,6.5vw,80px)] text-ink">
          Leverage: work that earns while you sleep.
        </h2>
        <p className="mt-6 max-w-3xl text-[18px] leading-relaxed text-ink-soft">
          Every tool in the Garage earns its keep the same way: you build it once, and it keeps working. It answers the
          same question a thousand times, reaches people you have never met, and never asks for overtime. That is
          leverage. It used to belong to people with dev teams and funding. AI just handed it to anyone who can write a
          clear sentence.
        </p>

        <div className="mt-10 grid gap-px border border-line bg-line lg:grid-cols-3">
          {QUOTES.map((q) => (
            <figure key={q.who} className="flex flex-col bg-card p-6">
              <blockquote className="flex-1 text-[17px] leading-relaxed text-ink">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-line pt-3">
                <p className="font-semibold text-ink">{q.who}</p>
                <p className="text-[13px] text-ink-faint">{q.what}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="t-h3 mt-10 text-[clamp(24px,3.2vw,36px)] text-ink">
          You bring the taste. AI brings the heavy lifting.
        </p>
        <p className="mt-3 max-w-3xl text-[17px] text-ink-soft">
          That is the plan here: 10x what you can ship, keep your name on it, and let the work pay you back. Not a
          hustle. A lever.
        </p>
      </div>
    </section>
  );
}
