import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/tarot/:path*',
        destination: 'http://localhost:8080/api/tarot/:path*',
      },
    ];
  },
};

export default nextConfig;
