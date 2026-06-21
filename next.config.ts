import type { NextConfig } from "next";

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
};

export default nextConfig;
