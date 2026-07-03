/**
 * The prompt-drop index — single source of truth for every SVX drop page.
 * Feeds the homepage "Free resources" section, the ItemList JSON-LD, and the
 * sitemap. Add a new drop here and everything else follows.
 */
export type Resource = {
  /** Series code, speakable in a reel: "SVX01" */
  code: string;
  /** Canonical page path (no redirect hop), with trailing slash */
  href: string;
  /** The short link people hear on Instagram: "/svx01" */
  short: string;
  /** Typo-catcher paths that should also land on this page */
  aliases: string[];
  title: string;
  /** One line of pure value — what it does for you, not what it is */
  oneLiner: string;
  /** Editorial date shown in the index row */
  dated: string;
  status: "live" | "brewing";
};

export const RESOURCES: Resource[] = [
  {
    code: "SVX01",
    href: "/svx2027-tastemaxxing-01/",
    short: "/svx01",
    aliases: ["/tastemaxxing", "/svx-tastemaxxing01", "/svx-tastemaxing01"],
    title: "TasteMaxxing",
    oneLiner:
      "One prompt turns your saved Instagram reels into a content brain: an Excel vault of every reel's frames, transcript, audio, and the exact angle for you to recreate it.",
    dated: "July 2026",
    status: "live",
  },
  {
    code: "SVX02",
    href: "",
    short: "",
    aliases: [],
    title: "Next drop",
    oneLiner: "In the lab. The email box on any drop page hears about it first.",
    dated: "Soon",
    status: "brewing",
  },
];
