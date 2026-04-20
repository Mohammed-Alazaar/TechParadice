import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { BRAND } from '@/lib/utils'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: `TechParadice is a founder-led, full-stack digital agency. Built in Ankara by ${BRAND.owner}, coordinated across a vetted senior freelancer network.`,
  path: '/about',
})

const values = [
  { title: 'No fluff', body: 'Clear scopes, clear numbers, clear communication. We protect your time.' },
  { title: 'Senior-only execution', body: 'No junior shadowing. Every person on your project has shipped at scale.' },
  { title: 'Transparent pricing', body: 'Budgets defined up front. No opaque percentages, no surprise invoices.' },
  { title: 'Built to ship', body: 'We measure ourselves on outcomes in production — not decks.' },
]

const disciplines = [
  'Product strategy',
  'UI/UX design',
  'Front-end engineering',
  'Mobile engineering',
  'SEO and analytics',
  'Paid media',
  'Content and copy',
  'Community and ops',
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            A full-stack digital team,{' '}
            <span className="text-teal">founder-led.</span>
          </>
        }
        description={`TechParadice is built and led by ${BRAND.owner} from ${BRAND.location}. One team, one point of accountability, senior execution across every discipline.`}
      />

      <Section tone="void" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-caption uppercase text-teal">Our story</p>
            <div className="mt-4 space-y-4 text-body-lg text-white/75">
              <p>
                I started TechParadice because I was tired of watching good
                companies pay three vendors to do what one coordinated team
                could do better. A website agency here, a social team there,
                a paid consultant on retainer — all bumping into each other,
                none owning the outcome.
              </p>
              <p>
                TechParadice collapses that. You get one senior team across
                web, mobile, design, SEO, content, social, community,
                analytics, and paid. One plan. One number to call.
              </p>
              <p>
                We’re lean by design — a core team plus a vetted network of
                senior freelancers, assembled per project. That’s how we
                deliver studio-quality work without the studio overhead.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-border-dark bg-surface p-8">
            <p className="text-caption uppercase text-teal">Founder</p>
            <p className="mt-4 font-display text-h2 font-bold text-white">
              {BRAND.owner}
            </p>
            <p className="mt-1 text-muted">{BRAND.location}</p>
            <div className="mt-6 space-y-3 text-[15px] text-white/70">
              <p>
                Engineer and operator with 10+ years building and shipping
                digital products.
              </p>
              <p>
                Hands-on across strategy, design direction, and code —
                involved on every engagement from kickoff to launch.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="What we believe"
          title="Four non-negotiables"
        />
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <li
              key={v.title}
              className="rounded-xl border border-border-dark bg-void p-6"
            >
              <span className="mb-3 inline-block h-px w-8 bg-teal" />
              <h3 className="font-display text-h4 font-semibold text-white">
                {v.title}
              </h3>
              <p className="mt-2 text-[14px] text-white/60">{v.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="void">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Network"
            title={
              <>
                A vetted network,{' '}
                <span className="text-teal">led by {BRAND.owner}.</span>
              </>
            }
            description="Senior specialists assembled per project. Every contributor is hand-picked, contract-bound, and reviewed per engagement."
          />
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {disciplines.map((d) => (
              <li
                key={d}
                className="flex items-center gap-3 rounded-lg border border-border-dark bg-surface px-4 py-3 text-[15px] text-white/80"
              >
                <span aria-hidden className="h-px w-5 bg-teal" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBanner />
    </>
  )
}
