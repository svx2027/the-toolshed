export interface Video {
  id: string;
  t: string; // title
  ch: string; // channel
  x: number; // outlier multiplier (how far it beat its channel average)
  views: number;
}

// A baked head-to-head pair. Both videos are from the same niche `n`.
export interface Pair {
  n: string;
  a: Video;
  b: Video;
}

export const PAIRS_URL = "/showdown-pairs.json";

// Small, CORS-enabled, true-16:9 YouTube thumbnail (~12KB; always exists).
export const thumb = (id: string): string => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;

export const NICHE_LABEL: Record<string, string> = {
  tech: "Tech",
  gaming: "Gaming",
  cooking: "Cooking",
  food: "Food",
  fitness: "Fitness",
  beauty: "Beauty",
  finance: "Finance",
  sports: "Sports",
  comedy: "Comedy",
  music: "Music",
  education: "Education",
  vlog: "Vlogs",
  kids: "Kids",
  diy: "DIY",
  auto: "Auto",
  misc: "Picks",
};

export function shuffle<T>(arr: readonly T[], rng: () => number = Math.random): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Baked titles carry a few HTML entities from the source feed; show the real characters.
export const titleText = (t: string): string =>
  t.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

export const fmtX = (x: number): string =>
  "outlier " + (x >= 10 ? Math.round(x) : x.toFixed(1)) + "x";

export function fmtViews(n: number): string {
  if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(0) + "K";
  return String(n);
}
