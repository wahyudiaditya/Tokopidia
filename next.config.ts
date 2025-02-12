import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.tokopedia.net",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
      {
        protocol: "https",
        hostname: "filebroker-cdn.lazada.co.id",
      },
      {
        protocol: "https",
        hostname: "id-live-01.slatic.net",
      },
      {
        protocol: "https",
        hostname: "sg-test-11.slatic.net",
      },
      {
        protocol: "https",
        hostname: "filebroker-cdn.lazada.sg",
      },
    ],
  },
};

export default nextConfig;
