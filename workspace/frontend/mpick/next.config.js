/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  // next.js config
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mpick-img-storage.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "m.silvercrossbaby.kr",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
  env: {
    KAKAOMAP_APPKEY: "c8f165df66717610ad6f6a2d45b89a42",
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://k9c202.p.ssafy.io/api/:path*",
        // destination: "http://localhost:5000/api/:path*",
      },
      {
        source: "/mpick/_search",
        destination: "http://k9c202.p.ssafy.io:9200/mpick/_search",
      },
      // {
      //   source: "/ws",
      //   destination: "http://localhost:5000/ws",
      // },
    ];
  },
});
