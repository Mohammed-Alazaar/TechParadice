import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Industries We Serve',
  description:
    'Explore digital strategy, websites, SEO, content, campaigns, and automation tailored to nine local, professional, and B2B sectors.',
  path: '/industries',
})

const localBusiness = [
  {
    href: '/industries/restaurants',
    title: 'Restaurants',
    description: 'Mobile-friendly menus, reservation journeys, local SEO, and social media designed around how guests discover and choose restaurants.',
    tags: ['Local SEO', 'Online Ordering', 'Social Media'],
  },
  {
    href: '/industries/real-estate',
    title: 'Real Estate',
    description: 'Property websites, CRM integration, enquiry journeys, and campaigns built to attract and qualify buyers, renters, and sellers.',
    tags: ['Listing Portals', 'Lead Capture', 'Paid Ads'],
  },
  {
    href: '/industries/clinics',
    title: 'Clinics & Healthcare',
    description: 'Booking journeys, local SEO, reputation support, and clear patient information for clinics and healthcare providers.',
    tags: ['Booking Systems', 'Medical SEO', 'Review Management'],
  },
  {
    href: '/industries/professional-services',
    title: 'Professional Services',
    description: 'Credible websites, search strategy, content, and enquiry journeys for consultancies, accountants, advisers, and other specialists.',
    tags: ['Professional Websites', 'Enquiry Journeys', 'Expert Content'],
  },
  {
    href: '/industries/salons-beauty',
    title: 'Salons & Beauty',
    description: 'Booking integrations, social content, local SEO, and paid campaigns that make salons easier to discover and book.',
    tags: ['Online Booking', 'Instagram & TikTok', 'Local SEO'],
  },
  {
    href: '/industries/auto-repair',
    title: 'Auto Repair',
    description: 'Local SEO, search campaigns, reputation support, and booking journeys for garages and automotive service businesses.',
    tags: ['Local SEO', 'Google Ads', 'Review Management'],
  },
]

const b2bIndustrial = [
  {
    href: '/industries/manufacturing-industrial',
    title: 'Manufacturing & Industrial',
    description: 'Product catalogues, dealer portals, multilingual B2B websites, and enquiry workflows designed for complex products and longer sales cycles.',
    tags: ['Product Catalogues', 'Multilingual', 'B2B Portals'],
  },
  {
    href: '/industries/b2b-businesses',
    title: 'B2B Businesses',
    description: 'Account-focused campaigns, lead-generation systems, responsible automation, and analytics designed around pipeline decisions.',
    tags: ['Account Focus', 'Lead Generation', 'Responsible AI'],
  },
  {
    href: '/industries/law-firms',
    title: 'Law Firms',
    description: 'Trust-focused websites, legal SEO, search campaigns, and structured enquiry journeys for law firms and legal practices.',
    tags: ['Law Firm Websites', 'Legal SEO', 'Enquiry Workflows'],
  },
]

function IndustryCard({
  href,
  title,
  description,
  tags,
  light = false,
}: {
  href: string
  title: string
  description: string
  tags: string[]
  light?: boolean
}) {
  const cardCls = light
    ? 'group flex h-full flex-col justify-between rounded-2xl border border-border-light bg-white p-8 transition-all hover:-translate-y-1 hover:border-teal/40 dark:border-border-dark dark:bg-void'
    : 'group flex h-full flex-col justify-between rounded-2xl border border-border-dark bg-surface p-8 transition-all hover:-translate-y-1 hover:border-teal/40'
  const titleCls = light
    ? 'font-display text-h3 font-semibold text-void dark:text-white'
    : 'font-display text-h3 font-semibold text-white'
  const descCls = light
    ? 'mt-4 text-[15px] text-void/70 dark:text-white/70'
    : 'mt-4 text-[15px] text-white/70'
  const tagCls = light
    ? 'rounded-full border border-border-light px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-muted dark:border-border-dark'
    : 'rounded-full border border-border-dark px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-muted'

  return (
    <Link href={href} className={cardCls}>
      <div>
        <div className="flex items-start justify-between">
          <h2 className={titleCls}>{title}</h2>
          <ArrowUpRight size={20} className="text-muted transition-colors group-hover:text-teal" />
        </div>
        <p className={descCls}>{description}</p>
      </div>
      <ul className="mt-8 flex flex-wrap gap-2">
        {tags.map((t) => (
          <li key={t} className={tagCls}>{t}</li>
        ))}
      </ul>
    </Link>
  )
}

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Digital work shaped around{' '}
            <span className="text-teal">how your business operates.</span>
          </>
        }
        description="Different sectors have different customer journeys, buying cycles, and operational constraints. We adapt the strategy, content, and technology accordingly."
      />

      <Section tone="void" className="pt-0">
        <SectionHeading
          eyebrow="Local Business"
          title="Make local discovery easier"
          description="Help nearby customers find accurate information, understand your offer, and take the next step with less friction."
        />
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {localBusiness.map((ind) => (
            <li key={ind.href} className="flex">
              <IndustryCard {...ind} />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="B2B & Industrial"
          title="Complex products, clear digital presence"
          description="Support technical buyers and longer sales cycles with useful content, structured journeys, and measurable lead handling."
        />
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {b2bIndustrial.map((ind) => (
            <li key={ind.href} className="flex">
              <IndustryCard {...ind} light />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner
        heading="Not sure where your business fits?"
        body="Tell us about your customers, goals, and current setup. We will recommend the most relevant capabilities and a sensible starting point."
        ctaHref="/free-audit"
        ctaLabel="Request a free audit"
        secondaryHref="/work"
        secondaryLabel="See our work"
      />
    </>
  )
}
