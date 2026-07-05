/**
 * The creator shelf — single source of truth for the /creators/ page.
 * Feeds the cards, the page title (count is computed), the Person JSON-LD,
 * and the sitemap entry. Nothing else to touch.
 *
 * HOW TO ADD A CREATOR (2 steps):
 *  1. (Optional) Drop a square photo at public/creators/<slug>.jpg
 *     (.png / .webp also work, 640x640 or bigger). No photo yet? Skip it,
 *     the card shows a monogram tile until the file exists.
 *  2. Copy the template block at the bottom of this file into CREATORS,
 *     fill it in, save. Page, count, JSON-LD, and sitemap follow.
 *
 * A build-time validator (bottom of file) fails `npm run build` if any entry
 * breaks the house rules (no em-dashes, real links, at least one handle), so a
 * bad paste is caught before it can ship.
 */

export type Social = {
  /** Picks the chip icon */
  platform: "youtube" | "substack" | "x" | "instagram" | "linkedin" | "web";
  /** Shown on the chip: "@aliabdaal" or "Beck At It" */
  handle: string;
  url: string;
};

export type Creator = {
  /** kebab-case id; also the photo filename: public/creators/<slug>.jpg */
  slug: string;
  name: string;
  /** One line under the name: who they are, in plain words */
  tagline: string;
  /** Card accent color, cycles through the brand pastels */
  accent: "lavender" | "peach" | "mint" | "sky";
  socials: Social[];
  /** Shivam's own words: what actually changed after following them */
  review: string;
  /** The one thing to consume first */
  bestWork: {
    kind: "Watch" | "Read";
    title: string;
    url: string;
    /** Why this one first, one short line */
    note: string;
  };
};

export const CREATORS: Creator[] = [
  {
    slug: "becky-isjwara",
    name: "Becky Isjwara",
    tagline:
      "Ran YouTube for Ali Abdaal, now Head of Social at Every. Builds Claude Code kits for non-engineers.",
    accent: "lavender",
    socials: [
      { platform: "web", handle: "beckyisj.com", url: "https://beckyisj.com/" },
      { platform: "substack", handle: "Beck At It", url: "https://beckyisj.substack.com" },
      { platform: "x", handle: "@beckyisj", url: "https://x.com/beckyisj" },
    ],
    review:
      "Becky ran YouTube strategy for Ali Abdaal, then went all in on AI. She is the clearest proof that you do not need to be an engineer: she builds Claude Code kits for people who have never touched a terminal. If the whole idea still feels like it is only for coders, start with her. It is not, and she shows you exactly why.",
    bestWork: {
      kind: "Read",
      title: "her site and free Web Dev Kit",
      url: "https://beckyisj.com/",
      note: "A Claude Code starter built for people who have never coded.",
    },
  },
  {
    slug: "ali-abdaal",
    name: "Ali Abdaal",
    tagline: "Doctor turned teacher. The gentlest on-ramp to any new tool.",
    accent: "peach",
    socials: [
      { platform: "youtube", handle: "@aliabdaal", url: "https://www.youtube.com/@aliabdaal" },
      { platform: "web", handle: "aliabdaal.com", url: "https://aliabdaal.com" },
    ],
    review:
      "Ali is the gentlest on-ramp I know. He teaches a new tool the way a good doctor explains things, slowly and kindly, with the scary parts named out loud. His beginner guide to Claude Code is the one I would hand anyone who is curious but nervous.",
    bestWork: {
      kind: "Watch",
      title: "The Ultimate Beginner's Guide to Claude Code",
      url: "https://www.youtube.com/watch?v=qLMYOhaKcZs&t=2268s",
      note: "His full walkthrough for people who have never opened it.",
    },
  },
  {
    slug: "nate-herk",
    name: "Nate Herk",
    tagline: "AI automation and n8n for people who do not code.",
    accent: "mint",
    socials: [
      { platform: "youtube", handle: "@nateherk", url: "https://www.youtube.com/@nateherk" },
      { platform: "x", handle: "@nateherk", url: "https://x.com/nateherk" },
    ],
    review:
      "Nate is where it stops being theory. He builds real automations on camera and gives you the templates, so you go from watching to running your own in an afternoon. If you learn by doing, this is your creator.",
    bestWork: {
      kind: "Watch",
      title: "Claude Fable 5 Made This Entire Video By Itself",
      url: "https://www.youtube.com/watch?v=ONmaDdOBGig",
      note: "Watch an AI build a real project end to end.",
    },
  },
  {
    slug: "andrej-karpathy",
    name: "Andrej Karpathy",
    tagline: "OpenAI co-founder. The person who named vibe coding.",
    accent: "sky",
    socials: [
      { platform: "x", handle: "@karpathy", url: "https://x.com/karpathy" },
      { platform: "youtube", handle: "@AndrejKarpathy", url: "https://www.youtube.com/@AndrejKarpathy" },
    ],
    review:
      "Karpathy gave us the words. He coined vibe coding, and he explains how these models actually think better than almost anyone. Follow him and the fog lifts: you stop guessing what to type and start understanding why it works.",
    bestWork: {
      kind: "Read",
      title: "his feed and LLM deep-dives",
      url: "https://x.com/karpathy",
      note: "Follow him, then watch his LLM deep-dive talks on YouTube.",
    },
  },
  {
    slug: "boris-cherny",
    name: "Boris Cherny",
    tagline: "The creator of Claude Code, teaching it himself.",
    accent: "lavender",
    socials: [
      { platform: "x", handle: "@bcherny", url: "https://x.com/bcherny" },
      { platform: "web", handle: "howborisusesclaudecode.com", url: "https://howborisusesclaudecode.com/" },
    ],
    review:
      "Boris built Claude Code. Watching the person who made it use it for 30 minutes taught me more shortcuts than weeks of trial and error. This is the fastest jump from it works to I am genuinely fast at this.",
    bestWork: {
      kind: "Watch",
      title: "Mastering Claude Code in 30 minutes",
      url: "https://www.youtube.com/watch?v=6eBSHbLKuN0",
      note: "Straight from the person who built it.",
    },
  },
  // ── Template: copy this block above, fill it in, save ──────────────────
  // {
  //   slug: "creator-slug",
  //   name: "Creator Name",
  //   tagline: "Who they are in one plain line",
  //   accent: "sky", // lavender | peach | mint | sky
  //   socials: [
  //     { platform: "youtube", handle: "@handle", url: "https://www.youtube.com/@handle" },
  //     { platform: "x", handle: "@handle", url: "https://x.com/handle" },
  //   ],
  //   review: "What actually changed for you after following them. Your words.",
  //   bestWork: {
  //     kind: "Watch", // or "Read"
  //     title: "the exact video or post title",
  //     url: "https://...",
  //     note: "Why this one first.",
  //   },
  // },
];

/**
 * Build-time guardrail. Runs on import (the page imports CREATORS), so any rule
 * break fails `npm run build` with a clear message instead of shipping. Keeps the
 * house style enforced even when future entries are added in a hurry.
 */
const BAD_HOSTS = new Set(["substack.com", "example.com", "test.com"]);
function validateCreators(list: Creator[]): void {
  const fail = (m: string) => {
    throw new Error(`creators.ts: ${m}`);
  };
  if (list.length < 2) fail("need at least 2 creators");
  const seen = new Set<string>();
  for (const c of list) {
    if (!/^[a-z0-9-]+$/.test(c.slug)) fail(`slug "${c.slug}" must be kebab-case`);
    if (seen.has(c.slug)) fail(`duplicate slug "${c.slug}"`);
    seen.add(c.slug);
    if (c.socials.length < 1) fail(`"${c.name}" needs at least one social handle`);
    const copy = [c.tagline, c.review, c.bestWork.title, c.bestWork.note].join(" ");
    if (copy.includes("—")) fail(`"${c.name}" copy has an em-dash (house rule: none)`);
    if (/\bten times\b/i.test(copy)) fail(`"${c.name}" copy says "ten times"; use "10x"`);
    for (const url of [c.bestWork.url, ...c.socials.map((s) => s.url)]) {
      let host: string;
      try {
        host = new URL(url).hostname.replace(/^www\./, "");
      } catch {
        fail(`"${c.name}" has an unparseable URL: ${url}`);
        continue;
      }
      // a bare root of these hosts means a placeholder slipped through
      if (BAD_HOSTS.has(host)) fail(`"${c.name}" points at a placeholder URL: ${url}`);
    }
  }
}
validateCreators(CREATORS);
