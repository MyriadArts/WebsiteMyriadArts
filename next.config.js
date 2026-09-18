/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "pub-de5dfcf82d8f4854a79642f955c48806.r2.dev",
      },
      {
        protocol: "https",
        hostname: "media.myriadarts.in",
      }
    ],
  },
};

module.exports = nextConfig;
