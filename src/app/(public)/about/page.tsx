import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { BRAND, SITE_URL, SOCIAL_LINKS } from '@/lib/utils'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: `Meet TechParadice, a founder-led digital agency based in Ankara and supported by a trusted network of specialists.`,
  path: '/about',
})

const values = [
  { title: 'Clarity first', body: 'Clear priorities, deliverables, success measures, and communication from day one.' },
  { title: 'Experienced specialists', body: 'Each contributor is selected for the skills and experience your project requires.' },
  { title: 'Transparent pricing', body: 'Scope and fees are agreed in advance, with changes discussed before work begins.' },
  { title: 'Useful outcomes', body: 'We focus on what the work needs to achieve for your customers and your business.' },
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
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: `About ${BRAND.name}`,
      url: `${SITE_URL}/about`,
      mainEntity: {
        '@type': 'Organization',
        name: BRAND.name,
        url: SITE_URL,
        sameAs: SOCIAL_LINKS,
        founder: {
          '@type': 'Person',
          name: BRAND.owner,
          jobTitle: 'Founder',
          worksFor: { '@type': 'Organization', name: BRAND.name, url: SITE_URL },
          homeLocation: { '@type': 'Place', name: BRAND.location },
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
      ],
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="About"
        title={
          <>
            A focused digital team,{' '}
            <span className="text-teal">founder-led.</span>
          </>
        }
        description={`TechParadice is led by ${BRAND.owner} from ${BRAND.location}. Clients get one accountable partner coordinating strategy, design, technology, and growth.`}
      />

      <Section tone="void" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-caption uppercase text-teal">Our story</p>
            <div className="mt-4 space-y-4 text-body-lg text-white/75">
              <p>
                I founded TechParadice because businesses should not have to
                coordinate several disconnected partners to improve one digital
                customer journey. Websites, campaigns, content, and analytics
                work better when they follow the same priorities.
              </p>
              <p>
                We bring those capabilities together. Your engagement has one
                plan, one accountable lead, and the right mix of specialists
                across web, mobile, design, SEO, content, social media,
                analytics, and paid campaigns.
              </p>
              <p>
                Our model combines a small core team with a trusted specialist
                network. We shape the team around the work, keep communication
                direct, and stay responsible from planning through launch.
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
                Engineer and operator experienced in building digital
                products.
              </p>
              <p>
                Hands-on across strategy, design direction, and engineering,
                with direct involvement from discovery through launch.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="What we believe"
          title="Four principles that guide our work"
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
                The right specialists,{' '}
                <span className="text-teal">led by {BRAND.owner}.</span>
              </>
            }
            description="Each team is assembled for the project at hand. Contributors are selected for relevant experience, given a clear scope, and accountable to the same delivery standards."
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
