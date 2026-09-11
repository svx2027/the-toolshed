import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";
import { RESOURCES } from "@/lib/resources";
import { CASE_STUDIES } from "@/lib/caseStudies";

const BASE = "https://shivamvashisth.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    // SVX2027 prompt-drop series — derived from the same list the homepage index renders
    ...RESOURCES.filter((r) => r.status === "live").map((r) => ({
      url: `${BASE}${r.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${BASE}/case-studies/`, changeFrequency: "monthly" as const, priority: 0.7 },
    ...CASE_STUDIES.map((cs) => ({
      url: `${BASE}/case-studies/${cs.slug}/`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...TOOLS.filter((t) => t.live).map((t) => ({
      url: `${BASE}/t/${t.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
