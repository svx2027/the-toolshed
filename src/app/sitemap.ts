import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";
import { RESOURCES } from "@/lib/resources";

const BASE = "https://shivamvashisth.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    // The creator shelf — content lives in src/lib/creators.ts
    { url: `${BASE}/creators/`, changeFrequency: "monthly", priority: 0.8 },
    // SVX2027 prompt-drop series — derived from the same list the homepage index renders
    ...RESOURCES.filter((r) => r.status === "live").map((r) => ({
      url: `${BASE}${r.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...TOOLS.filter((t) => t.live).map((t) => ({
      url: `${BASE}/t/${t.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
