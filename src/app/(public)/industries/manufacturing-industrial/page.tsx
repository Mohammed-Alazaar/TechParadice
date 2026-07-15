import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Digital Platforms for Manufacturing & Industry',
  description:
    'Product catalogues, dealer portals, multilingual B2B websites, enquiry workflows, SEO, and AI assistants for manufacturers and industrial companies.',
  path: '/industries/manufacturing-industrial',
})

const services = [
  { title: 'Product Catalogue Websites', detail: 'Searchable, filterable catalogues for model variants, accessories, applications, and technical specifications.' },
  { title: 'Dealer & Distributor Portals', detail: 'Secure portals for approved users to access relevant pricing, inventory, documentation, and service tools.' },
  { title: 'Multilingual Platforms', detail: 'Structured multilingual publishing with language-level controls and appropriate hreflang implementation.' },
  { title: 'Enquiry Workflow Automation', detail: 'Quote, product, service, and warranty requests routed to the appropriate team with defined notifications.' },
  { title: 'SEO & Content', detail: 'Technical product information and industry content organised for specific B2B searches and buyer questions.' },
  { title: 'AI Assistants', detail: 'Carefully governed assistants grounded in approved product information for common dealer and customer questions.' },
]

const results = [
  { value: '5', label: 'languages supported in the DragLab platform' },
  { value: '18', label: 'structured data models in the project' },
  { value: '6', label: 'lead and service workflows configured' },
]

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing & Industrial"
        title={
          <>
            Make complex products{' '}
            <span className="text-teal">easier to find and evaluate.</span>
          </>
        }
        description="We design multilingual B2B platforms, catalogues, portals, and enquiry workflows for manufacturers with technical products and distributed teams."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/free-audit"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            Request a free audit
          </Link>
          <Link
            href="/work/draglab-germany"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-[15px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            See DragLab case study
          </Link>
        </div>
      </PageHero>

      <Section tone="void" className="pt-0">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {results.map((r) => (
            <li key={r.label} className="rounded-2xl border border-border-dark bg-surface p-8">
              <p className="font-display text-[48px] font-extrabold leading-none text-teal">{r.value}</p>
              <p className="mt-3 text-[13px] uppercase tracking-[1.5px] text-muted">{r.label}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="What we do for manufacturers"
          title="Support technical buyers and distributed teams"
          description="Structure detailed product information clearly while giving authorised teams practical tools to manage content and enquiries."
        />
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.title} className="flex gap-3 rounded-xl border border-border-light bg-white p-6 dark:border-border-dark dark:bg-void">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-teal/40 bg-teal/10 text-teal">
                <Check size={14} />
              </span>
              <div>
                <h3 className="font-display text-[16px] font-semibold text-void dark:text-white">{s.title}</h3>
                <p className="mt-1 text-[13px] text-void/60 dark:text-white/60">{s.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner
        heading="Planning a stronger industrial digital platform?"
        body="Share your current setup, product structure, and team requirements. We will map the priorities for a practical next phase."
        ctaHref="/free-audit"
        ctaLabel="Request a free audit"
        secondaryHref="/work"
        secondaryLabel="See our work"
      />
    </>
  )
}
