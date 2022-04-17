/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io', "wheresobee.blog"],
  },
}

module.exports = nextConfig
