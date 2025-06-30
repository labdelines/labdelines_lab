/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {},
  },
  // Add other config options as needed
  poweredByHeader: false,
  images: {
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
