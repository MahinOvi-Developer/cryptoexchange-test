/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongoose']
  },
  images: {
    domains: ['localhost', 'api.johan-media.site', 'swptestt.johan-media.site']
  }
}

module.exports = nextConfig
