/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  turbopack: {
    // Fixa a raiz: o repo tem package-lock.json e pnpm-lock.yaml, e worktrees
    // aninhados fariam o Next inferir a raiz errada.
    root: __dirname,
  },
};

module.exports = nextConfig;
