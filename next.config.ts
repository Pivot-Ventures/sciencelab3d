import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  output: "export",
  basePath: "/museum/physics",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
