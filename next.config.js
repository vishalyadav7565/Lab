/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  images: {
    domains: ["res.cloudinary.com"],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;