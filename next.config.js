/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
