/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.1.59'],
};
module.exports = nextConfig;
