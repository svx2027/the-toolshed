import type { ReactNode } from "react";

/**
 * Marks a block for scroll-reveal. Visible by default; the RevealController arms +
 * animates it only in an active, painting tab (see globals.css). `delay` staggers
 * sibling reveals via transition-delay.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div data-reveal className={className} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}
