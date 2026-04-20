import { services } from '@/lib/services'

export const primaryNav = [
  {
    label: 'Services',
    href: '/services',
    children: services.map((s) => ({
      label: s.name,
      href: `/services/${s.slug}`,
      description: s.short,
    })),
  },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Process', href: '/process' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
] as const
