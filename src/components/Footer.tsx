export function Footer() {
  const links = [
    { label: "Help", href: "#faq" },
    { label: "Free resources", href: "#resources" },
    { label: "Case studies", href: "/case-studies/" },
    { label: "How it's built", href: "/how-this-portfolio-builds-itself/" },
    { label: "YouTube strategy ↗", href: "https://yt.shivamvashisth.com", external: true },
    { label: "Files ↗", href: "https://files.shivamvashisth.com", external: true },
    { label: "@svx2027", href: "https://instagram.com/svx2027", external: true },
    { label: "vashisthshivam00@gmail.com", href: "mailto:vashisthshivam00@gmail.com" },
  ];
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-14 sm:px-6">
        {/* the maker's mark, full width */}
        <p aria-hidden className="t-display select-none text-[clamp(44px,9.5vw,128px)] text-ink">
          Code for Creatives India
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-[14px] text-ink-faint">
          <span>Made in a garage, with AI, by one creator who replies to DMs.</span>
          <a href="#top" className="btn-ghost !py-2 !text-[13px]">
            Back to top ↑
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-line pt-6 font-mono text-[12px] text-ink-faint">
          <span>© {new Date().getFullYear()} Code for Creatives India</span>
          <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="text-ink-soft hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
