import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Digital Marketing for Salons & Beauty',
  description:
    'Booking systems, Instagram content, local SEO, and paid ads for hair salons, nail studios, spas, and beauty businesses in the GCC.',
  path: '/industries/salons-beauty',
})

const services = [
  { title: 'Online Booking Integration', detail: 'Seamless booking widgets that let clients self-schedule 24/7 from Instagram, Google, or your website.' },
  { title: 'Instagram & TikTok Content', detail: 'Scroll-stopping content plans, caption writing, and posting schedules built to grow your following and fill your diary.' },
  { title: 'Local SEO & Google Business Profile', detail: 'Optimised profiles and local keyword targeting so you appear when people search "salon near me".' },
  { title: 'Paid Social Campaigns', detail: 'Targeted Meta and TikTok ads that reach new clients within your catchment area at the right moment.' },
  { title: 'Loyalty & Referral Flows', detail: 'Automated messages that encourage repeat bookings and turn happy clients into your best marketers.' },
  { title: 'Website Development', detail: 'Fast, visually stunning sites that showcase your work and convert visitors into booked appointments.' },
]

const results = [
  { value: '2.8x', label: 'avg. booking increase' },
  { value: '< 3 wks', label: 'first results' },
  { value: '4.9★', label: 'avg. Google rating' },
]

export default function SalonsBeautyPage() {
  return (
    <>
      <PageHero
        eyebrow="Salons & Beauty"
        title={
          <>
            Fill your chairs with{' '}
            <span className="text-teal">digital that converts.</span>
          </>
        }
        description="Beauty clients discover you on Instagram and book on Google. We make sure you're found, looking great, and easy to book — everywhere they look."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/free-audit"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-[15px] font-semibold text-void transition-colors hover:bg-teal-dark"
          >
            Get a free audit
          </Link>
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-[15px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            All industries
          </Link>
        </div>
      </PageHero>

      {/* Results strip */}
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

      {/* Services */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="What we do for salons & beauty"
          title="Every touchpoint from discovery to rebooking"
          description="We cover the full beauty client journey — from first scroll to loyal regular."
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
        heading="Ready to fill your calendar?"
        body="Share your salon URL — we'll audit your online presence and find your biggest wins."
        ctaHref="/free-audit"
        ctaLabel="Get a Free Audit"
        secondaryHref="/work"
        secondaryLabel="See our work"
      />
    </>
  )
}
