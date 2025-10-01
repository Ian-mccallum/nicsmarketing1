/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  // Handle trailing slashes consistently
  trailingSlash: false,
  // Ensure proper page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
}

module.exports = nextConfig 