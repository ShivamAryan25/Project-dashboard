/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  eslint: {
    // Warning instead of error
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
