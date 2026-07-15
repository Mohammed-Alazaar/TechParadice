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
import { SOCIAL_LINKS } from '@/lib/utils'

export const metadata: Metadata = buildMetadata({
  title: 'TechParadice | Digital Strategy, Design & Growth',
  description:
    'TechParadice brings strategy, websites, mobile apps, UI/UX, SEO, content, social media, and paid campaigns into one coordinated digital plan.',
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
      image: 'https://techparadice.com/og-image.png',
      email: 'hello@techparadice.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Ankara', addressCountry: 'TR' },
      sameAs: SOCIAL_LINKS,
      description:
        'Digital agency providing strategy, websites, mobile apps, UI/UX design, SEO, content, social media, and paid campaigns.',
      knowsLanguage: ['en', 'ar'],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'hello@techparadice.com',
        contactType: 'customer service',
        availableLanguage: ['English', 'Arabic'],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: 'https://techparadice.com',
      name: 'TechParadice',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'TechParadice',
      url: 'https://techparadice.com',
      email: 'hello@techparadice.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Ankara', addressCountry: 'TR' },
      priceRange: '$0 – $5,000+',
      description: 'Digital agency providing web development, mobile apps, UI/UX design, SEO, content, social media, and paid campaigns.',
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
