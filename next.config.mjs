/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {},
  },
  // Add other config options as needed
  poweredByHeader: false,
  images: {
    formats: ["image/webp", "image/jpg", "image/png"],
  },
};

// Export the variable instead of anonymous object
module.exports = nextConfig;
