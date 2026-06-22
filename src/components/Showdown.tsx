"use client";

import { useEffect, useRef, useState } from "react";
import { buildPairs, fmtViews, fmtX, type Video } from "@/lib/showdown";

type Side = "left" | "right";
type Picked = { side: Side; win: boolean } | null;

export function Showdown() {
  const [pairs, setPairs] = useState<[Video, Video][]>([]);
  const [qi, setQi] = useState(0);
  const [flip, setFlip] = useState(false);
  const [picked, setPicked] = useState<Picked>(null);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [result, setResult] = useState<{ text: string; good: boolean } | null>(null);
  const timer = useRef<number | null>(null);

  // client-only init (random shuffle must not run during SSR)
  useEffect(() => {
    setPairs(buildPairs());
    try {
      const b = parseInt(localStorage.getItem("sd_best") || "0", 10);
      if (!Number.isNaN(b)) setBest(b);
    } catch {}
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  if (!pairs.length) {
    return <div className="min-h-[360px] rounded-3xl border border-line bg-card/60" aria-hidden />;
  }

  const pair = pairs[qi % pairs.length];
  const left = flip ? pair[1] : pair[0];
  const right = flip ? pair[0] : pair[1];

  const pick = (side: Side) => {
    if (picked) return;
    const chosen = side === "left" ? left : right;
    const other = side === "left" ? right : left;
    const win = chosen.x >= other.x;
    setPicked({ side, win });

    if (win) {
      const ns = streak + 1;
      setStreak(ns);
      setResult({ text: `Right! ${fmtX(chosen.x)} beat ${fmtX(other.x)}, on ${fmtViews(chosen.views)} views.`, good: true });
      if (ns > best) {
        setBest(ns);
        try { localStorage.setItem("sd_best", String(ns)); } catch {}
      }
    } else {
      setStreak(0);
      setResult({ text: `Nope. The other was the bigger outlier: ${fmtX(other.x)} vs ${fmtX(chosen.x)}.`, good: false });
    }

    timer.current = window.setTimeout(() => {
      setQi((q) => q + 1);
      setFlip(Math.random() < 0.5);
      setPicked(null);
      setResult(null);
    }, win ? 1300 : 1800);
  };

  return (
    <div className="rounded-3xl border border-line bg-card p-5 shadow-xl sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <strong className="font-display text-lg font-semibold text-ink">Thumbnail Showdown</strong>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1 text-xs text-ink-soft">
          streak <span className="font-mono text-ink">{streak}</span>
        </span>
      </div>
      <p className="mb-4 text-[0.92rem] text-ink-soft">
        Real YouTube videos. Which one over-performed its channel more? Tap one.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {(["left", "right"] as Side[]).map((side) => {
          const it = side === "left" ? left : right;
          const opp = side === "left" ? right : left;
          const isWin = picked ? it.x >= opp.x : false;
          const isLose = picked ? it.x < opp.x : false;
          return (
            <button
              key={side}
              onClick={() => pick(side)}
              disabled={!!picked}
              className={`overflow-hidden rounded-2xl border-2 bg-card text-left transition-all duration-150 ${
                isWin ? "border-acc-mint" : isLose ? "border-line opacity-50" : "border-line hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lg"
              }`}
            >
              <div className="bg-line">
                <img
                  src={`https://i.ytimg.com/vi/${it.id}/maxresdefault.jpg`}
                  alt=""
                  loading="lazy"
                  className="block aspect-video w-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.dataset.fb) {
                      img.dataset.fb = "1";
                      img.src = `https://i.ytimg.com/vi/${it.id}/hqdefault.jpg`;
                    }
                  }}
                />
              </div>
              <div className="px-2.5 py-2">
                <div
                  className="font-display font-semibold leading-[1.25] text-ink [overflow-wrap:anywhere]"
                  style={{ fontSize: "clamp(0.72rem,2.4vw,0.84rem)", minHeight: "2.5em" }}
                >
                  {it.t}
                </div>
                <div className="mt-1.5 flex items-center justify-between gap-1.5 text-[0.72rem] text-ink-faint">
                  <span className="truncate">{it.ch}</span>
                  {picked && <span className="whitespace-nowrap font-mono font-semibold text-ink">{fmtX(it.x)}</span>}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-3 min-h-[22px] text-[0.9rem] font-medium">
        {result && <span className={result.good ? "text-acc-mint" : "text-acc-rose"}>{result.text}</span>}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="font-mono text-[0.8rem] text-ink-faint">best {best}</span>
        <button
          onClick={() => shareStreak(best)}
          className="rounded-full border border-line-strong px-4 py-2 text-sm text-ink transition-colors hover:border-ink"
        >
          Share my streak
        </button>
      </div>

      <p className="mt-3 text-[0.78rem] text-ink-faint">
        “Breakout” = how far a video beat its own channel&rsquo;s average (via vidIQ). Real thumbnails fight dirty.
      </p>
    </div>
  );
}

/* ---- self-contained share card + confetti (light wash, matches the site's share cards) ---- */
async function shareStreak(best: number) {
  const w = 1080, h = 1080;
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) return;

  // pastel wash on warm paper
  ctx.fillStyle = "#FCFCFA";
  ctx.fillRect(0, 0, w, h);
  const blooms: [number, number, string][] = [
    [w * 0.12, h * 0.08, "rgba(230,224,242,0.9)"],
    [w * 0.92, h * 0.12, "rgba(248,226,212,0.85)"],
    [w * 0.85, h * 0.9, "rgba(223,240,230,0.85)"],
    [w * 0.1, h * 0.92, "rgba(220,234,245,0.88)"],
  ];
  for (const [cx, cy, col] of blooms) {
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.6);
    g.addColorStop(0, col);
    g.addColorStop(1, "rgba(252,252,250,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }
  ctx.textAlign = "center";
  ctx.fillStyle = "#8b867f";
  ctx.font = "500 30px 'JetBrains Mono', ui-monospace, monospace";
  ctx.fillText("THUMBNAIL SHOWDOWN", w / 2, 180);
  ctx.fillStyle = "#1C1B1A";
  ctx.font = "600 280px Fraunces, Georgia, serif";
  ctx.fillText(String(best), w / 2, h / 2 + 90);
  ctx.fillStyle = "#56524d";
  ctx.font = "500 46px Inter, system-ui, sans-serif";
  ctx.fillText("best streak, can you beat it?", w / 2, h / 2 + 200);
  ctx.fillStyle = "#8b867f";
  ctx.font = "500 26px 'JetBrains Mono', ui-monospace, monospace";
  ctx.fillText("shivamvashisth.com/#showdown", w / 2, h - 70);

  const blob = await new Promise<Blob | null>((res) => c.toBlob(res, "image/png", 0.95));
  if (!blob) return;
  const file = new File([blob], "thumbnail-showdown.png", { type: "image/png" });
  const text = `My Thumbnail Showdown streak: ${best}. Beat me → shivamvashisth.com`;
  const navAny = navigator as Navigator & { canShare?: (d: { files: File[] }) => boolean };
  if (navAny.canShare && navAny.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], text, title: "The Toolshed" });
      confetti();
      return;
    } catch (e) {
      if ((e as DOMException)?.name === "AbortError") return;
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "thumbnail-showdown.png";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  confetti();
}

function confetti() {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  const c = document.createElement("canvas");
  c.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:300";
  c.width = innerWidth; c.height = innerHeight;
  document.body.appendChild(c);
  const ctx = c.getContext("2d");
  if (!ctx) { c.remove(); return; }
  const cols = ["#6d5bb0", "#c2693a", "#2f8f63", "#2f6fae", "#c25274"];
  const parts = Array.from({ length: 120 }, (_, i) => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * 200,
    y: innerHeight / 3,
    vx: (Math.random() - 0.5) * 14,
    vy: Math.random() * -12 - 4,
    s: Math.random() * 8 + 4,
    col: cols[i % cols.length],
    rot: Math.random() * 6,
    vr: (Math.random() - 0.5) * 0.4,
  }));
  let t = 0;
  (function frame() {
    t++;
    ctx.clearRect(0, 0, c.width, c.height);
    for (const p of parts) {
      p.vy += 0.5; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.col;
      ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s);
      ctx.restore();
    }
    if (t < 90) requestAnimationFrame(frame);
    else c.remove();
  })();
}
