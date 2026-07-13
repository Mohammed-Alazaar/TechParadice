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
      { source: '/services/mobile-app-development', destination: '/services/mobile-apps', permanent: true },
      { source: '/services/seo', destination: '/services/seo-content', permanent: true },
      { source: '/services/social-media-management', destination: '/services/social-media', permanent: true },
      { source: '/services/paid-advertising', destination: '/services/paid-ads', permanent: true },
      { source: '/ar/services/mobile-app-development', destination: '/ar/services/mobile-apps', permanent: true },
      { source: '/ar/services/seo', destination: '/ar/services/seo-content', permanent: true },
      { source: '/ar/services/social-media-management', destination: '/ar/services/social-media', permanent: true },
      { source: '/ar/services/paid-advertising', destination: '/ar/services/paid-ads', permanent: true },
      // Removed services → hub
      { source: '/services/content-creation', destination: '/services', permanent: true },
      { source: '/services/community-management', destination: '/services', permanent: true },
      { source: '/services/analytics-reporting', destination: '/services', permanent: true },
      { source: '/ar/services/content-creation', destination: '/ar/services', permanent: true },
      { source: '/ar/services/community-management', destination: '/ar/services', permanent: true },
      { source: '/ar/services/analytics-reporting', destination: '/ar/services', permanent: true },
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
