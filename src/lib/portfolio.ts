export type CaseStudy = {
  slug: string
  client: string
  title: string
  industry: string
  services: string[]
  timeline: string
  year: string
  outcome: string
  cover?: string
  challenge: string
  approach: string[]
  solution: string[]
  results: { value: string; label: string }[]
  testimonial?: { quote: string; author: string; role: string }
}

export const portfolio: CaseStudy[] = [
  {
    slug: 'northwind-commerce',
    client: 'Northwind',
    title: 'Headless commerce refactor for a wholesale distributor',
    industry: 'B2B Commerce',
    services: ['Web Development', 'UI/UX Design', 'Analytics'],
    timeline: '12 weeks',
    year: '2025',
    outcome: '+38% conversion',
    challenge:
      'Northwind ran their B2B catalog on a legacy monolith. Page loads averaged 6.4s, mobile conversion was under 1%, and the sales team couldn’t iterate without a developer on standby.',
    approach: [
      'Audited the existing stack and mapped every page to a performance and conversion score.',
      'Designed a new component library in Figma aligned with their existing brand system.',
      'Shipped a Next.js 14 rebuild with a Sanity CMS so the sales team could publish without engineering.',
    ],
    solution: [
      'App Router with server components for instant navigation.',
      'Product and category pages served from the edge with ISR.',
      'Structured data, sitemaps, and GA4 conversions wired end-to-end.',
    ],
    results: [
      { value: '+38%', label: 'checkout conversion' },
      { value: '1.4s', label: 'median LCP' },
      { value: '2.1×', label: 'organic traffic in 90 days' },
    ],
    testimonial: {
      quote:
        'We went from shipping once a quarter to shipping every week. The difference is night and day.',
      author: 'Lena Kovač',
      role: 'VP Digital, Northwind',
    },
  },
  {
    slug: 'orbit-fintech-app',
    client: 'Orbit',
    title: 'Mobile app launch for a neobank',
    industry: 'Fintech',
    services: ['Mobile App', 'UI/UX Design', 'Analytics'],
    timeline: '16 weeks',
    year: '2025',
    outcome: '4.8★ App Store',
    challenge:
      'Orbit had a working web product and zero mobile presence. Their SMB customers were opening accounts on desktop but abandoning transfers on their phones.',
    approach: [
      'Ran a two-week discovery with the product and compliance teams.',
      'Prototyped three concepts in Figma and tested with real customers.',
      'Built a React Native app with native modules for biometric auth.',
    ],
    solution: [
      'Cross-platform iOS + Android from one codebase.',
      'Biometric onboarding with 2-step verification.',
      'Offline-first transaction queue with server reconciliation.',
    ],
    results: [
      { value: '4.8★', label: 'App Store rating' },
      { value: '21k', label: 'installs in first 30 days' },
      { value: '54%', label: 'of transfers now mobile' },
    ],
  },
  {
    slug: 'acacia-growth',
    client: 'Acacia',
    title: 'Full-funnel SEO + paid relaunch for a DTC skincare brand',
    industry: 'DTC / Beauty',
    services: ['SEO', 'Paid Ads', 'Content Creation'],
    timeline: '6 months',
    year: '2024',
    outcome: '3.2× ROAS',
    challenge:
      'Acacia’s launch traction had plateaued. Paid was bleeding, organic rankings were flat, and their content calendar felt disconnected from revenue.',
    approach: [
      'Rebuilt the keyword cluster around revenue pages, not vanity terms.',
      'Shipped a new creative testing framework with 6 angles / week.',
      'Tied paid, organic, and email into one dashboard.',
    ],
    solution: [
      'Full technical SEO pass and schema rollout.',
      '120 pieces of short-form creative across Meta + TikTok.',
      'Weekly budget reallocation against a single ROAS target.',
    ],
    results: [
      { value: '3.2×', label: 'blended ROAS' },
      { value: '+112%', label: 'organic sessions' },
      { value: '-28%', label: 'CAC' },
    ],
  },
]

export function getCaseStudy(slug: string) {
  return portfolio.find((c) => c.slug === slug)
}
