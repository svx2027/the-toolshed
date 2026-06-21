import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";

const BASE = "https://shivamvashisth.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    ...TOOLS.filter((t) => t.live).map((t) => ({
      url: `${BASE}/t/${t.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
