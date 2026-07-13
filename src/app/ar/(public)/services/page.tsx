import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getServices, type Service } from '@/lib/services'
import { buildMetadata } from '@/lib/seo'
import { SITE_URL, BRAND } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = buildMetadata({
  title: 'الخدمات',
  description: 'مواقع، تطبيقات، تصميم، SEO والمحتوى، سوشيال، إعلانات ومساعدو الذكاء الاصطناعي — فريق واحد متكامل.',
  path: '/ar/services',
  alternatePath: '/services',
  locale: 'ar',
})

const BUILD_SLUGS = ['web-development', 'mobile-apps', 'ui-ux-design']
const GROW_SLUGS = ['seo-content', 'social-media', 'paid-ads']
const AUTOMATE_SLUGS = ['ai-assistants']

const overviewFaqs = [
  {
    q: 'هل يمكنني العمل معكم على خدمة واحدة فقط؟',
    a: 'بالتأكيد. ابدأ بما تحتاجه — معظم عملائنا يضيفون خدمات مع نمو العلاقة.',
  },
  {
    q: 'هل أحتاج إلى معرفة ما أريده قبل التواصل؟',
    a: 'لا. شارك هدفك وقيودك. سنحدد المسار والمخرجات معاً.',
  },
  {
    q: 'كيف تسعّرون المشاريع؟',
    a: 'على أساس الميزانية. نقترح نطاقاً يناسب هدفك وننفذ بشفافية.',
  },
  {
    q: 'أين يتمركز فريقكم؟',
    a: 'مقرنا في أنقرة، تركيا. مع شبكة من كبار المستقلين المنتشرين في أوروبا والشرق الأوسط.',
  },
]

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon
  return (
    <Link
      href={`/ar/services/${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border-dark bg-surface p-6 transition-all hover:-translate-y-1 hover:border-teal/50"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-teal transition-transform duration-500 group-hover:scale-x-100" />
      <div className="flex items-start justify-between">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-teal/30 bg-teal/5 text-teal">
          <Icon size={20} />
        </span>
        <ArrowUpRight size={18} className="text-muted transition-colors group-hover:text-teal" />
      </div>
      <h2 className="mt-6 font-display text-h4 font-semibold text-white">
        {service.nameAr ?? service.name}
      </h2>
      <p className="mt-2 text-[14px] text-white/60">
        {service.shortAr ?? service.short}
      </p>
    </Link>
  )
}

function ClusterRow({
  label,
  services,
}: {
  label: string
  services: Service[]
}) {
  if (services.length === 0) return null
  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <span className="h-px w-8 bg-teal" />
        <p className="text-[11px] font-bold uppercase tracking-widest text-teal">{label}</p>
        <span className="h-px flex-1 bg-border-dark" />
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service.slug} className="flex">
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default async function ArServicesPage() {
  const services = await getServices()

  const build = services.filter((s) => BUILD_SLUGS.includes(s.slug))
  const grow = services.filter((s) => GROW_SLUGS.includes(s.slug))
  const automate = services.filter((s) => AUTOMATE_SLUGS.includes(s.slug))

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: services.map((service, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Service',
          name: service.nameAr ?? service.name,
          description: service.shortAr ?? service.short,
          url: `${SITE_URL}/ar/services/${service.slug}`,
          provider: { '@type': 'Organization', name: BRAND.name, url: SITE_URL },
          inLanguage: 'ar',
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: overviewFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="الخدمات"
        title={
          <>
            بناء. نمو.{' '}
            <span className="text-teal">أتمتة.</span>
          </>
        }
        description="سبع كفاءات متخصصة في ثلاثة محاور. عقد واحد، مسؤولية واحدة، خطة متكاملة."
      />

      <Section tone="void" className="space-y-16 pt-0">
        <ClusterRow label="بناء" services={build} />
        <ClusterRow label="نمو" services={grow} />
        <ClusterRow label="أتمتة" services={automate} />
      </Section>

      <Section tone="surface">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-caption uppercase text-teal">أفضل معاً</p>
            <h2 className="mt-4 heading-h2 text-balance text-white">
              معظم عملائنا يعملون معنا عبر{' '}
              <span className="text-teal">محورين أو أكثر.</span>
            </h2>
            <p className="mt-4 text-body-lg text-white/70">
              التنفيذ المنسق عبر البناء والنمو والأتمتة يتفوق على ثلاثة موردين منفصلين
              في كل مرة. خطة خلفية واحدة، فريق واحد مسؤول عن النتائج.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {[
              'ويب + SEO + سوشيال',
              'ويب + تصميم + إعلانات',
              'موبايل + تصميم + AI',
              'SEO + محتوى + إعلانات',
              'ويب + مساعد AI',
              'ويب + موبايل + تصميم',
            ].map((combo) => (
              <li
                key={combo}
                className="rounded-xl border border-border-dark bg-void p-5 font-display text-[16px] font-semibold text-white"
              >
                <span className="mb-2 inline-block h-px w-6 bg-teal" />
                <div>{combo}</div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="void">
        <SectionHeading
          eyebrow="أسئلة شائعة"
          title="أسئلة حول الخدمات"
          description="أسئلة أكثر تحديداً؟ كل صفحة خدمة تحتوي على قسم أسئلة شائعة خاص بها."
        />
        <div className="mt-10 max-w-3xl">
          <ul className="divide-y divide-border-dark">
            {overviewFaqs.map((faq) => (
              <li key={faq.q} className="py-6">
                <p className="font-display text-[17px] font-semibold text-white">{faq.q}</p>
                <p className="mt-2 text-[15px] text-white/70">{faq.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBanner
        heading="هل أنت مستعد للبدء؟"
        body="أخبرنا بأهدافك. سنقترح نطاق عمل يناسبك وخطة تُنجز."
        ctaLabel="احصل على تدقيق مجاني"
        ctaHref="/ar/free-audit"
        secondaryLabel="أعمالنا"
        secondaryHref="/ar/work"
      />
    </>
  )
}
