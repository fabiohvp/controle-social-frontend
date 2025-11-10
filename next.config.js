/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
	experimental: {
    esmExternals: 'loose',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });
    return config;
  },
};

module.exports = nextConfig;
