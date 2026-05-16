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
    const apiBase =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://api.rshop.roohbakhshac.ir";
    return [
      {
        source: "/api/:path*",
        destination: `${apiBase}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
