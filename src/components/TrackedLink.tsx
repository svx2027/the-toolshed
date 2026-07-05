"use client";

import { track } from "@/lib/track";

/**
 * An external link that fires one anonymous first-party event on click (via
 * src/lib/track.ts → /api/event/). Used for the creator "best work" CTAs so we
 * can count which resource people actually open, with no cookies and no PII.
 * Opens in a new tab; the event is fire-and-forget and never blocks the click.
 */
export function TrackedLink({
  href,
  event,
  className,
  ariaLabel,
  children,
}: {
  href: string;
  event: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={() => track(event)}
      className={className}
    >
      {children}
    </a>
  );
}
