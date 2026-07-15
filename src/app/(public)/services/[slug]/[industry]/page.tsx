import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { Faq } from '@/components/sections/Faq'
import { getService } from '@/lib/services'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 3600

type IndustryMeta = {
  label: string
  geo: string
  challenge: string
  focus: string
}

const INDUSTRY_META: Record<string, IndustryMeta> = {
  restaurants: {
    label: 'Restaurants',
    geo: 'GCC',
    challenge: 'turning local discovery into reservations and orders',
    focus: 'menus, locations, reservation journeys, local search, and guest communications',
  },
  'real-estate': {
    label: 'Real Estate',
    geo: 'GCC',
    challenge: 'helping buyers and renters find relevant properties and submit useful enquiries',
    focus: 'property discovery, lead qualification, campaign journeys, and CRM handover',
  },
  clinics: {
    label: 'Clinics & Healthcare',
    geo: 'GCC',
    challenge: 'making trusted information and appointment options easier to access',
    focus: 'patient information, local visibility, reputation, accessibility, and booking journeys',
  },
  'professional-services': {
    label: 'Professional Services',
    geo: 'GCC',
    challenge: 'turning expertise and referrals into a more consistent enquiry journey',
    focus: 'credibility, expert content, search visibility, and structured consultation enquiries',
  },
  'manufacturing-industrial': {
    label: 'Manufacturing & Industrial',
    geo: 'GCC',
    challenge: 'presenting complex products clearly across longer and often multilingual sales cycles',
    focus: 'technical catalogues, dealer access, multilingual publishing, and routed enquiries',
  },
  'b2b-businesses': {
    label: 'B2B Businesses',
    geo: 'GCC',
    challenge: 'supporting longer buying cycles with clearer qualification and measurement',
    focus: 'buyer journeys, useful content, account priorities, lead routing, and pipeline reporting',
  },
  'law-firms': {
    label: 'Law Firms',
    geo: 'GCC',
    challenge: 'building trust and making confidential enquiries easier to direct',
    focus: 'practice-area content, professional credibility, search visibility, and structured contact options',
  },
  'salons-beauty': {
    label: 'Salons & Beauty',
    geo: 'GCC',
    challenge: 'connecting social and local discovery with booking and rebooking',
    focus: 'visual content, local search, service information, booking tools, and client follow-up',
  },
  'auto-repair': {
    label: 'Auto Repair',
    geo: 'GCC',
    challenge: 'helping local drivers find the right service and contact the workshop quickly',
    focus: 'maps visibility, service information, reputation, calls, quotes, and appointment requests',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; industry: string }>
}): Promise<Metadata> {
  const { slug, industry } = await params
  const service = await getService(slug)
  const ind = INDUSTRY_META[industry]
  if (!service || !ind) return {}

  return buildMetadata({
    title: `${service.name} for ${ind.label}`,
    description: `${service.name} for ${ind.label} in the ${ind.geo}, shaped around ${ind.challenge}. ${service.short}`,
    path: `/services/${slug}/${industry}`,
  })
}

export default async function ServiceIndustryPage({
  params,
}: {
  params: Promise<{ slug: string; industry: string }>
}) {
  const { slug, industry } = await params
  const [service, ind] = await Promise.all([getService(slug), Promise.resolve(INDUSTRY_META[industry])])

  if (!service || !ind) notFound()

  const Icon = service.icon

  const faqs = [
    {
      q: `How long does a ${service.name} engagement for ${ind.label} take?`,
      a: 'Timing depends on the agreed deliverables, content readiness, integrations, approvals, and technical dependencies. After the initial review, we provide an indicative schedule with the proposed scope.',
    },
    {
      q: `How do you adapt ${service.name} for ${ind.label}?`,
      a: `We begin with the customer journey, operating requirements, local context, and any relevant compliance constraints. We then include only the deliverables that support your priorities and existing systems.`,
    },
    {
      q: 'What does the free audit include?',
      a: 'A focused review of your website, technical SEO, competitor positioning, and priority improvements. We aim to provide a written summary within two business days, with no obligation to continue.',
    },
  ]

  return (
    <>
      <PageHero
        eyebrow={`${service.name} · ${ind.label}`}
        title={
          <>
            {service.name} built for{' '}
            <span className="text-teal">{ind.label}.</span>
          </>
        }
        description={`${service.short} Applied to ${ind.label.toLowerCase()} priorities such as ${ind.challenge}.`}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/free-audit"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            Request a free audit <ArrowRight size={16} />
          </Link>
          <Link
            href={`/services/${slug}`}
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-[15px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            About {service.name}
          </Link>
        </div>
      </PageHero>

      <Section tone="void" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-teal/30 bg-teal/5 text-teal">
              <Icon size={26} />
            </span>
            <h2 className="mt-6 font-display text-h2 font-semibold text-white">{service.value}</h2>
            <p className="mt-4 text-body-lg text-white/70">
              For {ind.label} in the {ind.geo}, we shape the scope around {ind.focus}.
              The initial review confirms which priorities are relevant to your customers,
              team, systems, and budget.
            </p>
            <Link
              href={`/industries/${industry}`}
              className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-teal hover:underline"
            >
              Explore our {ind.label} services →
            </Link>
          </div>
          {service.deliverables.length > 0 ? (
            <ul className="grid grid-cols-1 gap-3">
              {service.deliverables.map((d) => (
                <li key={d} className="flex gap-3 rounded-xl border border-border-dark bg-surface p-4">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-teal/40 bg-teal/10 text-teal">
                    <Check size={12} />
                  </span>
                  <span className="text-[14px] text-white/80">{d}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-xl border border-border-dark bg-surface p-6 text-white/70">
              Deliverables are defined after the initial review and documented in the proposal.
            </p>
          )}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="How it works"
          title={`Our ${service.name} process for ${ind.label}`}
          description="The sequence is adapted to the scope, with responsibilities, review points, and decisions made clear before delivery begins."
        />
        {service.process.length > 0 ? (
          <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p, i) => (
              <li key={p.step} className="rounded-xl border border-border-light bg-white p-6 dark:border-border-dark dark:bg-void">
                <span className="font-display text-[40px] font-extrabold leading-none text-teal/25">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-[17px] font-semibold text-void dark:text-white">{p.step}</h3>
                <p className="mt-1 text-[13px] text-void/60 dark:text-white/60">{p.detail}</p>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-8 text-void/70 dark:text-white/70">
            The proposed delivery stages and review points will be included in your scope.
          </p>
        )}
      </Section>

      <Section tone="void">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading
            eyebrow="FAQ"
            title={`Questions about ${service.name} for ${ind.label}`}
            description="An initial review helps us answer these questions based on your current setup and priorities."
          />
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBanner
        heading={`Planning to improve your ${ind.label} digital journey?`}
        body={`Tell us your goals and constraints. We will recommend a ${service.name.toLowerCase()} scope aligned with your priorities and budget.`}
        ctaHref="/free-audit"
        ctaLabel="Request a free audit"
        secondaryHref={`/industries/${industry}`}
        secondaryLabel={`${ind.label} overview`}
      />
    </>
  )
}
