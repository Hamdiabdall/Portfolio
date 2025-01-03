/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['dev.to'],
    unoptimized: true,
  },
  reactStrictMode: true,
}

module.exports = nextConfig