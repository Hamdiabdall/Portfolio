/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['dev.to'],
    unoptimized: true,
  },
  reactStrictMode: true,
  // Ensure proper handling of client components
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Configure static export
  output: 'export',
  // Disable features not compatible with static export
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig