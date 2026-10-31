// Who this is for, as one still strip under the hero. (It used to scroll; it does not need to.)
const AUDIENCES = ["writers", "musicians", "designers", "comics", "journalists", "YouTubers", "you"];

export function AudienceMarquee() {
  return (
    <div className="border-b border-line" aria-label="For writers, musicians, designers, comics, journalists, YouTubers, you">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-2 px-4 py-4 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-faint sm:px-6">
        {AUDIENCES.map((a) => (
          <span key={a}>
            for <span className="text-ink">{a}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
