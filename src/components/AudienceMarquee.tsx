// A slow, hairline-bordered ticker naming the audience. Pure CSS animation
// (see .marquee-track in globals.css); reduced-motion users get a static strip.
const AUDIENCES = ["writers", "musicians", "designers", "comics", "journalists", "YouTubers", "you"];

function Run() {
  return (
    <span className="flex shrink-0 items-baseline">
      {AUDIENCES.map((a) => (
        <span key={a} className="flex items-baseline">
          <span className="px-6 font-mono text-sm uppercase tracking-[0.22em] text-ink-faint sm:px-9">for {a}</span>
          <span aria-hidden className="text-line-strong">·</span>
        </span>
      ))}
    </span>
  );
}

export function AudienceMarquee() {
  return (
    <div className="relative z-10 overflow-hidden border-y border-line py-4" aria-label="For writers, musicians, designers, comics, journalists, YouTubers, you">
      <div className="marquee-track flex w-max">
        <Run />
        <span aria-hidden>
          <Run />
        </span>
      </div>
    </div>
  );
}
