import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Digital Strategy for Professional Services',
  description:
    'Credible websites, SEO, expert content, campaigns, and enquiry journeys for consultancies, accountants, advisers, and professional services firms.',
  path: '/industries/professional-services',
})

const services = [
  { title: 'Professional Services Websites', detail: 'Fast, polished websites that make your expertise, services, and points of difference easy to assess.' },
  { title: 'Expert Content & SEO', detail: 'Articles, guides, case studies, and technical SEO organised around real client questions.' },
  { title: 'Google & LinkedIn Campaigns', detail: 'Focused campaigns for relevant decision-makers, services, sectors, and search intent.' },
  { title: 'Enquiry Journeys', detail: 'Useful resources, consultation booking, forms, and follow-up sequences aligned with your sales process.' },
  { title: 'Reputation Support', detail: 'Practical processes for reviews, testimonials, case studies, and professional recognition.' },
  { title: 'AI-Assisted Enquiries', detail: 'Carefully scoped forms and assistants that capture context and route enquiries to the right person.' },
]

const priorities = [
  { value: 'Explain', label: 'services, expertise, and relevance clearly' },
  { value: 'Prove', label: 'credibility through useful evidence and content' },
  { value: 'Enquire', label: 'low-friction paths to the right specialist' },
]

export default function ProfessionalServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Professional Services"
        title={
          <>
            Make your expertise{' '}
            <span className="text-teal">easier to understand and trust.</span>
          </>
        }
        description="Build a credible digital presence that explains your value, supports informed decisions, and gives prospective clients a clear route to your team."
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
          eyebrow="What we do for professional services"
          title="Connect visibility, credibility, and enquiry"
          description="Shape search, content, website, campaign, and follow-up activity around the way your clients evaluate expertise."
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
        heading="Want a stronger route from expertise to enquiry?"
        body="Tell us your goals and share your current website. We will identify the highest-priority opportunities to improve the journey."
        ctaHref="/free-audit"
        ctaLabel="Request a free audit"
        secondaryHref="/work"
        secondaryLabel="See our work"
      />
    </>
  )
}
