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
  title: 'TechParadice | Web Development, Apps, SEO & Social Media',
  description:
    'TechParadice is a digital agency delivering websites, mobile apps, UI/UX design, SEO, content, social media, and paid campaigns for growing businesses.',
  path: '/',
})

export default function HomePage() {
  // No Organization/WebSite JSON-LD here: the root layout renders the canonical
  // @graph on every route. Duplicating it without @id refs previously produced
  // three competing, subtly disagreeing entity nodes on this page.
  return (
    <>
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
