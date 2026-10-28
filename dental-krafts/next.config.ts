import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      { source: "/dr-pramod-gulia", destination: "/dr-parmod-gulia", permanent: true },
      { source: "/treatment-costs", destination: "/treatments", permanent: true },
      { source: "/our-doctors", destination: "/our-dentists", permanent: true },
      { source: "/gallery/", destination: "/gallery", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
