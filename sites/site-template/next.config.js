/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@primecred/ui', '@primecred/utils'],
  experimental: {
    externalDir: true,
  },
}

module.exports = nextConfig
