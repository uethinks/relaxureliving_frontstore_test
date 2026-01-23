const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  staticPageGenerationTimeout: 180,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['swiper', '@radix-ui/react-accordion', '@radix-ui/react-select'],
  },
  rewrites: async () => {
    return [
      {
        source: "/api/data/:match*",
        destination: "https://test2.relaxureliving.com/_vercel/insights/:match*",
      },
      {
        source: "/api/performance/:match*",
        destination: "https://test2.relaxureliving.com/_vercel/speed-insights/:match*",
      },
    ];
  },
   
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "relaxureliving.com",
      },
      {
        protocol: "https",
        hostname: "cms.relaxureliving.com",
      },
      {
        protocol: "https",
        hostname: "relaxureliving-bucket.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "cmstest.relaxureliving.com",
      },
      {
        protocol: "https",
        hostname: "cmstest2.relaxureliving.com",
      },
      {
        protocol: "https",
        hostname: "assets.relaxureliving.com",
      }
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1年缓存
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    loader: 'default',
    unoptimized: false,
  },
  env: {
    AIRWALLEX_ENV: process.env.NEXT_PUBLIC_AIRWALLEX_ENV || "demo",
  },
}

module.exports = nextConfig
