import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [new URL("https://img.clerk.com/*")],
  },
};

export default nextConfig;
