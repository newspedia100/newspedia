import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove standalone for Vercel (it handles this automatically)
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  // Optimize for Vercel
  experimental: {
    // Enable optimizations
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
