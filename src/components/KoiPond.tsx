"use client";

import Script from "next/script";

/** The ambient "floating lanterns" background: drifting lanterns, glow trails, and
 *  pointer ripples (the concentric circles that follow the cursor). It reads the site's
 *  data-theme, renders nothing below 1280px (desktop-only), keeps clear of a centred
 *  reading band, and respects prefers-reduced-motion. Loaded lazily so it never delays
 *  first paint. Lingers ~16s, then gently fades out and fully tears itself down
 *  (data-auto-hide), so it is gone before anyone notices. */
export function KoiPond() {
  return (
    <>
      <div
        id="koi-pond"
        data-transparent="true"
        data-keepout-width="1100"
        data-min-width="1280"
        data-density="1"
        data-auto-hide="16"
        data-fade-seconds="3.5"
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
      />
      <Script src="/assets/koi-pond.js?v=2-autohide" strategy="lazyOnload" />
    </>
  );
}
