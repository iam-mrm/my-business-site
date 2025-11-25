import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static Site Generation (SSG)
  output: 'export',
  
  // Performance Optimizations
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  
  // Image Optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.placehold.co',
      },
    ],
  },

  // Security Headers (configure at deployment level for SSG)
  // For Vercel: Use vercel.json
  // For Netlify: Use netlify.toml

  // Optimize Bundle Size (Turbopack compatible)
  turbopack: {},
};

export default nextConfig;
