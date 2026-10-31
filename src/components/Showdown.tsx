"use client";

import { useEffect, useRef, useState } from "react";
import { PAIRS_URL, NICHE_LABEL, shuffle, thumb, titleText, fmtViews, fmtX, type Pair, type Video } from "@/lib/showdown";

type Side = "left" | "right";
type Picked = { side: Side; win: boolean } | null;

/* Pointer tilt: the card leans toward the cursor while it hovers (pointer devices only, see .tilt in globals.css). */
function tiltMove(e: React.PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - 0.5;
  const py = (e.clientY - r.top) / r.height - 0.5;
  el.classList.remove("is-resting");
  el.style.setProperty("--ry", `${(px * 10).toFixed(2)}deg`);
  el.style.setProperty("--rx", `${(-py * 10).toFixed(2)}deg`);
}
function tiltLeave(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.classList.add("is-resting");
  el.style.setProperty("--ry", "0deg");
  el.style.setProperty("--rx", "0deg");
}

export function Showdown() {
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [qi, setQi] = useState(0);
  const [flip, setFlip] = useState(false);
  const [picked, setPicked] = useState<Picked>(null);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [result, setResult] = useState<{ text: string; good: boolean } | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(PAIRS_URL)
      .then((r) => r.json())
      .then((data: Pair[]) => {
        if (!alive || !Array.isArray(data) || !data.length) return;
        const shuffled = shuffle(data);
        setPairs(shuffled);
        schedulePrefetch(shuffled);
      })
      .catch(() => {});
    try {
      const b = parseInt(localStorage.getItem("sd_best") || "0", 10);
      if (!Number.isNaN(b)) setBest(b);
    } catch {}
    return () => {
      alive = false;
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  if (!pairs.length) {
    return <div className="min-h-[420px] border border-line bg-card" aria-label="Loading the game" />;
  }

  const pair = pairs[qi % pairs.length];
  const left = flip ? pair.b : pair.a;
  const right = flip ? pair.a : pair.b;
  const nextPair = pairs[(qi + 1) % pairs.length];

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
    <div id="showdown" className="border border-line bg-card p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <strong className="t-h3 text-[22px] text-ink">Thumbnail Showdown</strong>
        <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-faint">
          streak <span className="text-ink">{streak}</span>
        </span>
      </div>
      <p className="mb-3 text-[15px] text-ink-soft">
        Two videos from the same niche. Which one over-performed its channel more? Tap one.
      </p>

      <p className="t-kicker mb-3">
        <i aria-hidden className="mr-2 inline-block h-2 w-2 rounded-full bg-acc align-[1px]" />
        same niche: {NICHE_LABEL[pair.n] ?? "Picks"}
      </p>

      <div className="grid grid-cols-2 gap-3">
        {(["left", "right"] as Side[]).map((side) => {
          const it: Video = side === "left" ? left : right;
          const opp: Video = side === "left" ? right : left;
          const isWin = picked ? it.x >= opp.x : false;
          const isLose = picked ? it.x < opp.x : false;
          return (
            <button
              key={side}
              onClick={() => pick(side)}
              disabled={!!picked}
              onPointerMove={picked ? undefined : tiltMove}
              onPointerLeave={tiltLeave}
              className={`tilt overflow-hidden border bg-card text-left ${
                isWin ? "border-win" : isLose ? "border-line opacity-50" : "border-line hover:border-ink"
              }`}
            >
              <div className="bg-line">
                <img
                  src={thumb(it.id)}
                  alt=""
                  width={320}
                  height={180}
                  loading="eager"
                  decoding="async"
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
                  className="font-semibold leading-[1.25] text-ink [overflow-wrap:anywhere]"
                  style={{ fontSize: "clamp(0.72rem,2.4vw,0.86rem)", minHeight: "2.5em" }}
                >
                  {titleText(it.t)}
                </div>
                <div className="mt-1.5 flex items-end justify-between gap-1.5 text-[12px] text-ink-faint">
                  <span className="truncate">{it.ch}</span>
                  {picked && (
                    <span className={`t-num whitespace-nowrap text-[26px] ${isWin ? "text-win" : "text-lose"}`}>
                      {fmtX(it.x).replace("outlier ", "")}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* warm the next pair's images so the round flips instantly */}
      <div aria-hidden className="hidden">
        <img src={thumb(nextPair.a.id)} alt="" width={1} height={1} loading="eager" />
        <img src={thumb(nextPair.b.id)} alt="" width={1} height={1} loading="eager" />
      </div>

      <div className="mt-3 min-h-[22px] text-[15px] font-medium">
        {result && <span className={result.good ? "text-win" : "text-lose"}>{result.text}</span>}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-faint">best {best}</span>
        <button onClick={() => shareStreak(best)} className="btn-ghost !py-2 !text-[13px]">
          Share my streak
        </button>
      </div>

      <p className="mt-3 text-[12px] text-ink-faint">
        &ldquo;Breakout&rdquo; = how far a video beat its own channel&rsquo;s average (via vidIQ). Real thumbnails fight dirty.
      </p>
    </div>
  );
}

/* ---- prefetch every thumbnail through the service worker (offline play), once, on idle ---- */
function schedulePrefetch(pairs: Pair[]) {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (conn && (conn.saveData || conn.effectiveType === "2g" || conn.effectiveType === "slow-2g")) return;
  const urls = pairs.flatMap((p) => [thumb(p.a.id), thumb(p.b.id)]);
  const send = () => {
    const post = () => navigator.serviceWorker.controller?.postMessage({ type: "prefetch", urls });
    if (navigator.serviceWorker.controller) post();
    else navigator.serviceWorker.addEventListener("controllerchange", post, { once: true });
  };
  const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void }).requestIdleCallback;
  if (ric) ric(send, { timeout: 4000 });
  else window.setTimeout(send, 2000);
}

/* ---- self-contained share card + confetti (paper, ink, one yellow strap: the site's look) ---- */
function siteFont(varName: string, fallback: string): string {
  try {
    const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return v || fallback;
  } catch {
    return fallback;
  }
}

async function shareStreak(best: number) {
  const w = 1080, h = 1080;
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) return;
  const display = siteFont("--font-display", "Impact, sans-serif");
  const body = siteFont("--font-sans", "system-ui, sans-serif");
  const mono = siteFont("--font-mono", "ui-monospace, monospace");

  ctx.fillStyle = "#F5F5F1";
  ctx.fillRect(0, 0, w, h);
  // yellow strap, top
  ctx.fillStyle = "#FFD60A";
  ctx.fillRect(90, 120, 900, 92);
  ctx.fillStyle = "#111216";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.font = `900 54px ${display}`;
  ctx.fillText("THUMBNAIL SHOWDOWN", 118, 168);
  // the number
  ctx.textAlign = "center";
  ctx.font = `900 420px ${display}`;
  ctx.fillText(String(best), w / 2, h / 2 + 40);
  ctx.fillStyle = "#3F4150";
  ctx.font = `500 44px ${body}`;
  ctx.fillText("best streak, can you beat it?", w / 2, h / 2 + 300);
  // hairline + url
  ctx.fillStyle = "#D7D8DD";
  ctx.fillRect(90, h - 150, 900, 2);
  ctx.fillStyle = "#5E6170";
  ctx.font = `400 28px ${mono}`;
  ctx.fillText("shivamvashisth.com/#showdown", w / 2, h - 90);

  const blob = await new Promise<Blob | null>((res) => c.toBlob(res, "image/png", 0.95));
  if (!blob) return;
  const file = new File([blob], "thumbnail-showdown.png", { type: "image/png" });
  const text = `My Thumbnail Showdown streak: ${best}. Beat me at shivamvashisth.com`;
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
  const cols = ["#FFD60A", "#1F2FE0", "#111216", "#0E8F5A", "#B5123A"];
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
