import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Digital for Manufacturing & Industrial Companies',
  description:
    'Product catalogs, dealer portals, multilingual B2B sites, and lead pipelines built for manufacturers and industrial companies.',
  path: '/industries/manufacturing-industrial',
})

const services = [
  { title: 'Product Catalog Sites', detail: 'Searchable, filterable catalogs with nested model variants, accessories, and technical specs.' },
  { title: 'Dealer & Distributor Portals', detail: 'Authenticated portals for dealers to access pricing, inventory, and warranty tools.' },
  { title: 'Multilingual Platforms', detail: 'Full 5+ language support with per-language publish control and hreflang tags.' },
  { title: 'Lead Pipeline Automation', detail: 'Inquiry, quote, and warranty forms routed to the right team with email automation.' },
  { title: 'SEO & Content', detail: 'Technical product pages and industry content optimised for long-tail B2B search.' },
  { title: 'AI Assistants', detail: 'Chatbots trained on your product catalog to handle first-line dealer and customer inquiries.' },
]

const results = [
  { value: '5', label: 'languages shipped (DragLab case)' },
  { value: '18', label: 'data models, zero dev dependency' },
  { value: '6', label: 'lead capture workflows automated' },
]

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing & Industrial"
        title={
          <>
            Complex products,{' '}
            <span className="text-teal">clear digital presence.</span>
          </>
        }
        description="We've built multilingual B2B platforms for manufacturers that need global reach, dealer portals, and lead pipelines their non-technical teams can operate."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/free-audit"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            Get a free audit
          </Link>
          <Link
            href="/work/draglab"
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
          title="Built for long sales cycles and global buyers"
          description="Your buyers are technical, your products are complex, and your team needs to update content without calling a developer."
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
        heading="Ready to modernise your B2B digital presence?"
        body="We'll audit your current setup and map a path to a platform your global team can operate independently."
        ctaHref="/free-audit"
        ctaLabel="Get a Free Audit"
        secondaryHref="/work"
        secondaryLabel="See our work"
      />
    </>
  )
}
