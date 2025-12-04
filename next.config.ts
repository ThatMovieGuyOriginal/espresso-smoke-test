import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: false,
  },
}

export default nextConfig
