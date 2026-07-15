/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      // Portfolio → Work
      { source: '/portfolio', destination: '/work', permanent: true },
      { source: '/portfolio/:slug', destination: '/work/:slug', permanent: true },
      { source: '/ar/portfolio', destination: '/ar/work', permanent: true },
      { source: '/ar/portfolio/:slug', destination: '/ar/work/:slug', permanent: true },
      // Service slug renames
      { source: '/services/mobile-apps', destination: '/services/mobile-app-development', permanent: true },
      { source: '/services/seo-content', destination: '/services/seo', permanent: true },
      { source: '/services/social-media', destination: '/services', permanent: true },
      { source: '/services/social-media-management', destination: '/services', permanent: true },
      { source: '/services/community-management', destination: '/services', permanent: true },
      { source: '/services/analytics-reporting', destination: '/services', permanent: true },
      { source: '/services/paid-ads', destination: '/services/paid-advertising', permanent: true },
      { source: '/services/ai-assistants', destination: '/services', permanent: true },
      { source: '/ar/services/mobile-apps', destination: '/ar/services/mobile-app-development', permanent: true },
      { source: '/ar/services/seo-content', destination: '/ar/services/seo', permanent: true },
      { source: '/ar/services/social-media', destination: '/ar/services', permanent: true },
      { source: '/ar/services/social-media-management', destination: '/ar/services', permanent: true },
      { source: '/ar/services/community-management', destination: '/ar/services', permanent: true },
      { source: '/ar/services/analytics-reporting', destination: '/ar/services', permanent: true },
      { source: '/ar/services/paid-ads', destination: '/ar/services/paid-advertising', permanent: true },
      { source: '/ar/services/ai-assistants', destination: '/ar/services', permanent: true },
      // Pricing → Free Audit
      { source: '/pricing', destination: '/free-audit', permanent: true },
      { source: '/ar/pricing', destination: '/ar/free-audit', permanent: true },
      // Process → How We Work
      { source: '/process', destination: '/how-we-work', permanent: true },
      { source: '/ar/process', destination: '/ar/how-we-work', permanent: true },
    ]
  },
}

export default nextConfig
