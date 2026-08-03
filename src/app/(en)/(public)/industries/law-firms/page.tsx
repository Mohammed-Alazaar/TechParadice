import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'
import { IndustrySchema } from '@/components/seo/PageSchema'

export const metadata: Metadata = buildMetadata({
  title: 'Digital Marketing for Law Firms',
  description:
    'Trust-focused websites, legal SEO, search campaigns, structured enquiries, and analytics for law firms and legal practices in the GCC.',
  path: '/industries/law-firms',
})

const services = [
  { title: 'Law Firm Websites', detail: 'Professional websites that explain practice areas, experience, locations, and contact options clearly.' },
  { title: 'Legal Content & SEO', detail: 'Useful practice-area pages, FAQs, and technical SEO aligned with relevant client searches.' },
  { title: 'Google Search Campaigns', detail: 'Carefully structured campaigns for relevant practice areas, locations, and search intent.' },
  { title: 'Enquiry Workflows', detail: 'Structured forms, routing, and approved follow-up steps that help your team respond consistently.' },
  { title: 'Reputation Support', detail: 'Review-request and case-study processes designed around consent and applicable professional requirements.' },
  { title: 'Analytics & Attribution', detail: 'Reporting that connects available search, campaign, website, and enquiry data.' },
]

const priorities = [
  { value: 'Discover', label: 'relevant visibility across search and campaigns' },
  { value: 'Evaluate', label: 'clear expertise, services, and expectations' },
  { value: 'Contact', label: 'confidential, structured enquiry options' },
]

export default function LawFirmsPage() {
  return (
    <>
      <IndustrySchema
        locale="en"
        path="/industries/law-firms"
        name="Digital Marketing for Law Firms"
        description="Trust-focused websites, legal SEO, search campaigns, structured enquiries, and analytics for law firms and legal practices in the GCC."
        audience="Law Firms"
        crumb="Law Firms"
      />
      <PageHero
        eyebrow="Law Firms"
        title={
          <>
            Build trust before the{' '}
            <span className="text-teal">first consultation.</span>
          </>
        }
        description="Help prospective clients understand your expertise, assess fit, and contact the right team through a clear and professional digital experience."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/free-audit"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            Request a free audit
          </Link>
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-[15px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            All industries
          </Link>
        </div>
      </PageHero>

      {/* Client journey priorities */}
      <Section tone="void" className="pt-0">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {priorities.map((r) => (
            <li key={r.label} className="rounded-2xl border border-border-dark bg-surface p-8">
              <p className="font-display text-[48px] font-extrabold leading-none text-teal">{r.value}</p>
              <p className="mt-3 text-[13px] uppercase tracking-[1.5px] text-muted">{r.label}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Services */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="What we do for law firms"
          title="Support the journey from search to enquiry"
          description="Create a credible, informative path that helps prospective clients understand when and how to contact your firm."
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
        heading="Want a clearer digital presence for your firm?"
        body="Share your website and priorities. We will review the current experience and identify practical improvements."
        ctaHref="/free-audit"
        ctaLabel="Request a free audit"
        secondaryHref="/work"
        secondaryLabel="See our work"
      />
    </>
  )
}
