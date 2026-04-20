export const primaryNav = [
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Website Development', href: '/services/web-development', description: 'Fast, accessible sites built in Next.js.' },
      { label: 'Mobile App Development', href: '/services/mobile-app-development', description: 'Native-feeling iOS and Android apps.' },
      { label: 'Custom UI/UX Design', href: '/services/ui-ux-design', description: 'Design systems that look right and work harder.' },
      { label: 'SEO', href: '/services/seo', description: 'Technical and content SEO that compounds.' },
      { label: 'Social Media Management', href: '/services/social-media-management', description: 'On-brand social that builds trust and pipeline.' },
      { label: 'Content Creation', href: '/services/content-creation', description: 'Writing, design, and video that earns attention.' },
      { label: 'Community Management', href: '/services/community-management', description: 'Respond, moderate, and grow.' },
      { label: 'Analytics & Reporting', href: '/services/analytics-reporting', description: 'Dashboards that actually get read.' },
      { label: 'Paid Advertising', href: '/services/paid-advertising', description: 'Meta, Google, LinkedIn, and TikTok for ROAS.' },
    ],
  },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Process', href: '/process' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
] as const
