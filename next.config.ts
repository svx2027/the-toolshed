import type { NextConfig } from "next";
import { RESOURCES } from "./src/lib/resources";

const nextConfig: NextConfig = {
  // Tool pages live as static files in /public/t/<slug>/ and are linked with a trailing slash.
  trailingSlash: true,
  // Serve the static tool pages' index.html for their clean /t/<slug>/ URLs.
  async rewrites() {
    return [
      { source: "/t/:slug", destination: "/t/:slug/index.html" },
      { source: "/t/:slug/", destination: "/t/:slug/index.html" },
    ];
  },
  // Speakable short links + typo-catchers for the SVX2027 prompt-drop series,
  // derived from the same list that renders the homepage index (src/lib/resources.ts).
  async redirects() {
    // Speakable short links + typo/alias catchers, all derived from the live
    // RESOURCES entries (e.g. /svx02, /mentors, /people all point at /creators/).
    return RESOURCES.filter((r) => r.status === "live").flatMap((r) =>
      [r.short, ...r.aliases].map((source) => ({
        source,
        destination: r.href,
        permanent: false,
      })),
    );
  },
};

export default nextConfig;
