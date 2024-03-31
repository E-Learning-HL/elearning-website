/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "stg.nhakhoahub.vn",
      //   port: "",
      //   pathname: "/_next/**",
      // },
      {
        protocol: "https",
        hostname: "nhakhoahub-dev.sgp1.digitaloceanspaces.com",
        port: "",
        pathname: "/prod/wp-content/uploads/**",
      },
    ],
  },
  // images: {
  //   domains: ["nhakhoahub-dev.sgp1.digitaloceanspaces.com"],
  // },
  experimental: {
    missingSuspenseWithCSRBailout: false,
    appDir: false,
  },
  headers: [
    {
      key: "Access-Control-Allow-Origin",
      value: process.env.NEXT_PUBLIC_APP_URL,
    },
  ],
};
// module.exports = nextConfig;

// Injected content via Sentry wizard below

