import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
      images: {
        domains: ['localhost'], // nếu dùng http://localhost:3000/uploads
      },
    });
  }
};

export default nextConfig;
