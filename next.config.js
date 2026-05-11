/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      hmrRefreshes: true,
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "dl.poshtybanman.ir" },
      { protocol: "https", hostname: "dl.roohbakhshac.com" },
      { protocol: "https", hostname: "dl.roohbakhshac.ir" },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
      ? { exclude: ["error", "warn"] }
      : false,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://app-backend-rshop-nodejs.roohbakhshac.com/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
