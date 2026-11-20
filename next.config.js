/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cpus: 1,
    webpackBuildWorker: false,
    workerThreads: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
