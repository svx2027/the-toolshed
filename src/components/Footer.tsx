export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line pt-14 pb-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-7">
        {/* the maker's mark, full width, quiet */}
        <p
          aria-hidden
          className="select-none text-center font-display text-[clamp(2.2rem,7.5vw,5.5rem)] font-semibold leading-none tracking-tight text-ink/[0.08]"
        >
          Code for Creatives India
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm text-ink-faint">
          <span>Made in a garage, with AI, by one creator who replies to DMs.</span>
          <a href="#top" className="rounded-full border border-line-strong px-4 py-2 text-ink-soft transition-colors hover:border-ink hover:text-ink">
            Back to top ↑
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line pt-6 text-sm text-ink-faint">
          <span>© {new Date().getFullYear()} Code for Creatives India</span>
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <a href="#faq" className="text-ink-soft transition-colors hover:text-ink">
              Help
            </a>
            <span aria-hidden>·</span>
            <a href="#resources" className="text-ink-soft transition-colors hover:text-ink">
              Free resources
            </a>
            <span aria-hidden>·</span>
            <a href="/case-studies/" className="text-ink-soft transition-colors hover:text-ink">
              Case studies
            </a>
            <span aria-hidden>·</span>
            <a href="https://files.shivamvashisth.com" target="_blank" rel="noopener noreferrer" className="text-ink-soft transition-colors hover:text-ink">
              Files ↗
            </a>
            <span aria-hidden>·</span>
            <a href="https://instagram.com/svx2027" target="_blank" rel="noopener noreferrer" className="text-ink-soft transition-colors hover:text-ink">
              @svx2027
            </a>
            <span aria-hidden>·</span>
            <a href="mailto:vashisthshivam00@gmail.com" className="text-ink-soft transition-colors hover:text-ink">
              vashisthshivam00@gmail.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
