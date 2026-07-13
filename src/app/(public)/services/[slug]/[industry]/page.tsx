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

const INDUSTRY_META: Record<string, { label: string; geo: string; painPoint: string; proof: string }> = {
  restaurants:          { label: 'Restaurants',            geo: 'GCC',    painPoint: 'empty tables and low online visibility',                        proof: 'restaurants we work with see +3x table reservations within 6 weeks' },
  'real-estate':        { label: 'Real Estate',            geo: 'GCC',    painPoint: 'low-quality leads and wasted ad spend',                          proof: 'real estate clients report 2.4x lead volume at –31% cost' },
  clinics:              { label: 'Clinics & Healthcare',   geo: 'GCC',    painPoint: 'missed appointments and a weak online presence',                  proof: 'healthcare clients average 2.1x appointment growth in 4 weeks' },
  'professional-services': { label: 'Professional Services', geo: 'GCC', painPoint: 'no consistent inbound pipeline beyond referrals',                 proof: 'professional service firms see +89% organic traffic and –34% cost per lead' },
  'manufacturing-industrial': { label: 'Manufacturing & Industrial', geo: 'GCC', painPoint: 'slow sales cycles and hard-to-navigate product catalogs', proof: 'manufacturing clients ship multilingual platforms in 20 weeks' },
  'b2b-businesses':     { label: 'B2B Businesses',         geo: 'GCC',    painPoint: 'long sales cycles and no attribution on marketing spend',         proof: 'B2B clients achieve 3.2x ROAS and +112% organic traffic' },
  'law-firms':          { label: 'Law Firms',              geo: 'GCC',    painPoint: 'over-reliance on referrals and low search visibility',            proof: 'law firm clients see 3.1x consultation uplift and –29% cost per intake' },
  'salons-beauty':      { label: 'Salons & Beauty',        geo: 'GCC',    painPoint: 'empty appointment slots and low Instagram reach',                 proof: 'beauty clients see 2.8x bookings in under 3 weeks' },
  'auto-repair':        { label: 'Auto Repair',            geo: 'GCC',    painPoint: 'low call volume and poor local search rankings',                  proof: 'auto repair shops see 4.1x call volume and top-3 Google rank in 6 weeks' },
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
    description: `${service.name} built specifically for ${ind.label} in the ${ind.geo}. ${service.short} Tackle ${ind.painPoint}.`,
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
      q: `How quickly can you deliver ${service.name} results for a ${ind.label} business?`,
      a: `Typical first results are visible within 4–8 weeks. ${ind.proof}.`,
    },
    {
      q: `Do you specialise in ${ind.label}?`,
      a: `Yes. We've worked with ${ind.label} businesses across the GCC and built processes tailored to your specific buyer journey and compliance environment.`,
    },
    {
      q: 'What does the free audit include?',
      a: 'A review of your current site, technical SEO health, competitor snapshot, and a prioritised action plan — delivered within 48 hours, no commitment required.',
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
        description={`${service.short} Tailored to the specific challenges ${ind.label} businesses face — ${ind.painPoint}.`}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/free-audit"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            Get a free audit <ArrowRight size={16} />
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
              For {ind.label} in the GCC, this translates to: solving {ind.painPoint}, without adding headcount or changing what makes you great.
            </p>
            <Link
              href={`/industries/${industry}`}
              className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-teal hover:underline"
            >
              See our full {ind.label} page →
            </Link>
          </div>
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
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="How it works"
          title={`Our ${service.name} process for ${ind.label}`}
          description="Four clear steps — no black boxes, no moving goalposts."
        />
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
      </Section>

      <Section tone="void">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading
            eyebrow="FAQ"
            title={`${service.name} for ${ind.label} — questions`}
            description="More questions? The free audit is the fastest way to get specific answers."
          />
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBanner
        heading={`Ready to grow your ${ind.label} business?`}
        body={`Tell us your goals. We'll propose ${service.name.toLowerCase()} scope that fits your budget and ships on time.`}
        ctaHref="/free-audit"
        ctaLabel="Get a Free Audit"
        secondaryHref={`/industries/${industry}`}
        secondaryLabel={`${ind.label} overview`}
      />
    </>
  )
}
