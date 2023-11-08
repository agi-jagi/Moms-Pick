/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  // next.js config
  reactStrictMode: true,
  env: {
    KAKAOMAP_APPKEY: "a7d4463b676b95709da00fcec2cdfbc1",
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // destination: "https://k9c202.p.ssafy.io/api/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
      {
        source: "/ws",
        destination: "http://localhost:5000/ws",
      },
    ];
  },
});
