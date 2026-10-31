// The hero figure's data: one channel's last 28 videos, as bars. Heights sit around a median of 0.45,
// except one, which did 14.2x the median. Deterministic, so the SVG fallback and the 3D scene always agree.
export const COLS = 7;
export const ROWS = 4;
export const OUTLIER = 17;
export const OUTLIER_X = 14.2;
export const MEDIAN = 0.45;

export function barHeights(): number[] {
  const out: number[] = [];
  for (let i = 0; i < COLS * ROWS; i++) {
    const s = Math.sin(i * 12.9898 + 1.3) * 43758.5453;
    const f = s - Math.floor(s);
    out.push(0.28 + f * 0.34);
  }
  out[OUTLIER] = MEDIAN * OUTLIER_X;
  return out;
}
