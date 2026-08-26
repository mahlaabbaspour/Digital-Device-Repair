import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // basePath: process.env.BASEPATH,
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true
  },

  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/admin/dashboard',
        permanent: true
      }
    ]
  }
}

export default nextConfig
