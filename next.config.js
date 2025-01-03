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
  // Optimize for static exports
  output: 'export',
  // Disable server-side features when exporting
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig