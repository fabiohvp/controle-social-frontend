/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
	experimental: {
    esmExternals: 'loose',
  },
};

module.exports = nextConfig;
