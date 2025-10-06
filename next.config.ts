import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Add/keep any other redirects here.

      // sidewalk → parathetika
      {
        source: "/stories/sidewalk",
        destination: "/stories/parathetika",
        permanent: true, // 308/301 — updates the URL in the bar
      },
    ];
  },
};

export default nextConfig;
