/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  turbopack: {
    // Fixa a raiz: o repo tem package-lock.json e pnpm-lock.yaml, e worktrees
    // aninhados fariam o Next inferir a raiz errada.
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/prefeitoPorUmDia",
        destination: "/prefeito-por-um-dia",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
