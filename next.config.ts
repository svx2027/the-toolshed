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
  // Speakable short links for the SVX2027 prompt-drop series: /svx01 → drop 01, etc.
  // Plus typo-catchers for versions people retype from memory after a reel.
  async redirects() {
    return [
      { source: "/svx01", destination: "/svx2027-tastemaxxing-01/", permanent: false },
      { source: "/tastemaxxing", destination: "/svx2027-tastemaxxing-01/", permanent: false },
      { source: "/svx-tastemaxxing01", destination: "/svx2027-tastemaxxing-01/", permanent: false },
      { source: "/svx-tastemaxing01", destination: "/svx2027-tastemaxxing-01/", permanent: false },
    ];
  },
};

export default nextConfig;
