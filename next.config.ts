import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Live website screenshot service used for project previews
      { protocol: "https", hostname: "image.thum.io" },
    ],
  },
};

export default nextConfig;
