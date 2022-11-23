/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["m.media-amazon.com", "dummyimage.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
