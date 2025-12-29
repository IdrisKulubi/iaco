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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;