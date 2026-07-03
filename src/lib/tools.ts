export type Audience = "everyone" | "creator";

export interface Tool {
  slug: string;
  name: string;
  desc: string;
  aud: Audience;
  live: boolean;
  c: string; // icon chip background (pastel)
  ac: string; // icon stroke (accent)
  icon: keyof typeof ICONS;
}

export const TOOLS: Tool[] = [
  { slug: "life-in-weeks", name: "Life in Weeks", desc: "See your whole life as a grid of weeks, then post it.", aud: "everyone", live: true, c: "#DCEAF5", ac: "#235e95", icon: "grid" },
  { slug: "read-rate", name: "Read Rate", desc: "Find your real reading speed in 60 seconds.", aud: "everyone", live: true, c: "#DFF0E6", ac: "#1f7a4f", icon: "gauge" },
  { slug: "year-in-emoji", name: "Year in Emoji", desc: "Sum up your year in twelve emoji and twelve words.", aud: "everyone", live: true, c: "#F8E2D4", ac: "#a8551f", icon: "cal" },
  { slug: "aligned", name: "Aligned", desc: "See how aligned you and someone else really are.", aud: "everyone", live: true, c: "#E6E0F2", ac: "#5b4a9e", icon: "heart" },
  { slug: "drift", name: "Drift", desc: "A one-button calm game. Hop, and let the thoughts pass.", aud: "everyone", live: true, c: "#DFF0E6", ac: "#1f7a4f", icon: "wave" },
  { slug: "comment-goldmine", name: "Comment Goldmine", desc: "Turn a video's comments into ten content ideas.", aud: "creator", live: false, c: "#E6E0F2", ac: "#5b4a9e", icon: "chat" },
  { slug: "outlier-radar", name: "Outlier Radar", desc: "Spot what's overperforming in your niche right now.", aud: "creator", live: false, c: "#DCEAF5", ac: "#235e95", icon: "radar" },
  { slug: "sealed", name: "Sealed", desc: "Write a letter to your future self, delivered on a date.", aud: "everyone", live: false, c: "#F8E2D4", ac: "#a8551f", icon: "mail" },
];

export const ICONS = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  gauge: '<path d="M12 13a4 4 0 0 1 4-4"/><circle cx="12" cy="13" r="9"/><path d="M12 13l4-3"/>',
  cal: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
  heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/>',
  radar: '<circle cx="12" cy="12" r="9"/><path d="M12 12l6-3M12 12V4"/><circle cx="12" cy="12" r="3"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  wave: '<path d="M3 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/><path d="M3 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/>',
} as const;

