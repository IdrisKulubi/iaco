import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable server actions for Next.js 15
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  // Enable TypeScript strict mode for better type safety
  typescript: {
    ignoreBuildErrors: false,
  },
  // Optimize for production builds
  swcMinify: true,
};

export default nextConfig;