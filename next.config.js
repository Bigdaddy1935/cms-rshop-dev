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
    // Prefer the in-cluster Docker hostname so the proxy stays on the
    // internal CapRover network. See rshop-front-main/next.config.mjs
    // for the full rationale — same fix, same env var.
    const apiBase =
      process.env.INTERNAL_API_URL ||
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
