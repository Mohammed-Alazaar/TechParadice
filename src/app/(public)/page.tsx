import type { Metadata } from 'next'

export const revalidate = 300
import { Hero } from '@/components/sections/Hero'
import { LogoCloud } from '@/components/sections/LogoCloud'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { WhyUs } from '@/components/sections/WhyUs'
import { FeaturedWork } from '@/components/sections/FeaturedWork'
import { ProcessSnapshot } from '@/components/sections/ProcessSnapshot'
import { Testimonial } from '@/components/sections/Testimonial'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'TechParadice — Your digital world, built.',
  description:
    'Full-stack digital agency. Websites, mobile apps, UI/UX, SEO, social, content, and ads — built by one senior team.',
  path: '/',
})

export default function HomePage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'TechParadice',
      url: 'https://techparadice.com',
      logo: 'https://techparadice.com/og-image.png',
      email: 'hello@techparadice.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Ankara', addressCountry: 'TR' },
      sameAs: [],
      description:
        'Full-stack digital agency offering websites, mobile apps, UI/UX design, SEO, social media, content creation, and paid advertising.',
      serviceArea: { '@type': 'AdministrativeArea', name: 'Worldwide' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: 'https://techparadice.com',
      name: 'TechParadice',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://techparadice.com/blog?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'TechParadice',
      url: 'https://techparadice.com',
      email: 'hello@techparadice.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Ankara', addressCountry: 'TR' },
      priceRange: '$0 – $5,000+',
      description: 'Digital agency: web development, mobile apps, SEO, social media, and design.',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <LogoCloud />
      <ServicesGrid />
      <WhyUs />
      <FeaturedWork />
      <ProcessSnapshot />
      <Testimonial />
      <CtaBanner />
    </>
  )
}
