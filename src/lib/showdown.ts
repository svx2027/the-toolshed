import poolData from "./showdown-pool.json";

export interface Video {
  id: string;
  t: string; // title
  ch: string; // channel
  x: number; // outlier multiplier (how far it beat its channel average)
  views: number;
}

export const POOL: Video[] = poolData as Video[];

/** Build ~176 head-to-head pairs from the pool: shuffle, pair adjacent, drop ties. */
export function buildPairs(rng: () => number = Math.random): [Video, Video][] {
  const a = POOL.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  const pairs: [Video, Video][] = [];
  for (let i = 0; i + 1 < a.length; i += 2) {
    if (a[i].x !== a[i + 1].x) pairs.push([a[i], a[i + 1]]);
  }
  return pairs;
}

export const fmtX = (x: number): string =>
  "outlier " + (x >= 10 ? Math.round(x) : x.toFixed(1)) + "x";

export function fmtViews(n: number): string {
  if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(0) + "K";
  return String(n);
}
