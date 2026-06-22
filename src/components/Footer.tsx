export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line py-12">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 text-sm text-ink-faint sm:px-7">
        <span>Made in a garage, with AI, by one creator who replies to DMs.</span>
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>© {new Date().getFullYear()} Code for Creatives India</span>
          <span aria-hidden>·</span>
          <a href="https://files.shivamvashisth.com" target="_blank" rel="noopener noreferrer" className="text-ink-soft transition-colors hover:text-ink">
            Files ↗
          </a>
          <span aria-hidden>·</span>
          <a href="https://instagram.com/svx2027" target="_blank" rel="noopener noreferrer" className="text-ink-soft transition-colors hover:text-ink">
            @svx2027
          </a>
          <span aria-hidden>·</span>
          <a href="mailto:hi@shivamvashisth.com" className="text-ink-soft transition-colors hover:text-ink">
            hi@shivamvashisth.com
          </a>
        </span>
      </div>
    </footer>
  );
}
