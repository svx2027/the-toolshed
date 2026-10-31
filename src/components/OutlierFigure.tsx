"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { barHeights, OUTLIER, OUTLIER_X, COLS, ROWS } from "@/lib/outlier";

/* The same 28 bars, flat. Shown while the 3D scene loads, and instead of it when WebGL is missing or data saver is on. */
function Flat() {
  const h = barHeights();
  const max = Math.max(...h);
  const W = 600, H = 220, pad = 10;
  const bw = (W - pad * 2) / h.length;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label="28 videos from one channel as bars; one is 14 times taller than the rest">
      {h.map((v, i) => {
        const bh = ((H - pad * 2) * v) / max;
        return (
          <rect
            key={i}
            x={pad + i * bw + bw * 0.2}
            y={H - pad - bh}
            width={bw * 0.6}
            height={bh}
            style={{ fill: i === OUTLIER ? "var(--acc)" : "var(--line-strong)" }}
          />
        );
      })}
      <line x1={pad} x2={W - pad} y1={H - pad} y2={H - pad} style={{ stroke: "var(--line-strong)" }} />
    </svg>
  );
}

const Field = dynamic(() => import("./OutlierField"), { ssr: false, loading: () => <Flat /> });

export function OutlierFigure() {
  const [gl, setGl] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return;
    let ok = false;
    try {
      const c = document.createElement("canvas");
      ok = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      ok = false;
    }
    if (!ok) return;
    // Let the thumbnails and fonts land first; the scene is a nice-to-have, not the content.
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(() => setGl(true), { timeout: 2500 });
    else window.setTimeout(() => setGl(true), 900);
  }, []);

  return (
    <figure className="mt-12 border-y border-line sm:mt-16">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_2fr] lg:items-center">
        <figcaption>
          <p className="t-kicker">What an outlier looks like</p>
          <p className="t-num mt-3 text-[64px] text-acc sm:text-[84px]">{OUTLIER_X}x</p>
          <p className="mt-2 max-w-[34ch] text-[15px] leading-snug text-ink-soft">
            {`${COLS * ROWS} videos from one channel. One did ${OUTLIER_X} times the channel’s median. The Showdown above is practice at spotting that one before the numbers come in.`}
          </p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
            {gl ? "Drag to look around" : "Figure"}
          </p>
        </figcaption>
        <div className="h-[240px] sm:h-[320px]">{gl ? <Field /> : <Flat />}</div>
      </div>
    </figure>
  );
}
