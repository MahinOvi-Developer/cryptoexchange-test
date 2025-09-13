/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mysql2']
  },
  images: {
    domains: ['localhost', 'api.johan-media.site', 'swptestt.johan-media.site']
  }
};

module.exports = nextConfig
