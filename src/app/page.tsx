import type { Metadata } from 'next'
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
