import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { getArServices, type ArabicService } from '@/lib/services'
import { buildMetadata } from '@/lib/seo'
import { SITE_URL, BRAND } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = buildMetadata({
  title: 'الخدمات',
  description: 'خدمات متكاملة في تطوير المواقع والتطبيقات وتصميم UI/UX وSEO والمحتوى وإدارة منصات التواصل والمجتمعات والتحليلات والإعلانات المدفوعة.',
  path: '/ar/services',
  alternatePath: '/services',
  locale: 'ar',
})

const BUILD_SLUGS = ['web-development', 'mobile-app-development', 'ui-ux-design']
const GROW_SLUGS = ['seo', 'content-creation', 'paid-advertising']
const ENGAGE_MEASURE_SLUGS = ['social-media-management', 'community-management', 'analytics-reporting']

const overviewFaqs = [
  {
    q: 'هل يمكنني العمل معكم على خدمة واحدة فقط؟',
    a: 'نعم. يمكننا تنفيذ مشروع مركز لخدمة واحدة، أو تنسيق عدة خبرات عندما يعتمد العمل عليها.',
  },
  {
    q: 'هل أحتاج إلى معرفة ما أريده قبل التواصل؟',
    a: 'لا. شاركنا الهدف والوضع الحالي والقيود ونطاق الميزانية، وسنساعدك على تحديد نطاق العمل الأكثر فائدة وشرح المفاضلات.',
  },
  {
    q: 'كيف تسعّرون المشاريع؟',
    a: 'يعكس التسعير نطاق العمل المتفق عليه ودرجة التعقيد والفريق ومتطلبات التنفيذ. نوثق المخرجات والافتراضات والرسوم والمراحل قبل بدء العمل.',
  },
  {
    q: 'أين يتمركز فريقكم؟',
    a: 'مقر TechParadice في أنقرة، تركيا، ونستعين بخبرات متخصصة وفق احتياجات كل مشروع.',
  },
]

function ServiceCard({ service }: { service: ArabicService }) {
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
        {service.nameAr}
      </h2>
      <p className="mt-2 text-[14px] text-white/60">
        {service.shortAr}
      </p>
    </Link>
  )
}

function ClusterRow({
  label,
  services,
}: {
  label: string
  services: ArabicService[]
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
  const services = await getArServices()

  const build = services.filter((s) => BUILD_SLUGS.includes(s.slug))
  const grow = services.filter((s) => GROW_SLUGS.includes(s.slug))
  const engageAndMeasure = services.filter((s) => ENGAGE_MEASURE_SLUGS.includes(s.slug))

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: services.map((service, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Service',
          name: service.nameAr,
          description: service.shortAr,
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
            ابنِ حضورك الرقمي وطوّره{' '}
            <span className="text-teal">واربط مكوّناته.</span>
          </>
        }
        description="اختر خبرة محددة أو اجمع عدة خدمات ضمن خطة مترابطة، مع مسؤوليات واضحة وأولويات مشتركة."
      />

      <Section tone="void" className="space-y-16 pt-0">
        {services.length > 0 ? (
          <>
            <ClusterRow label="بناء" services={build} />
            <ClusterRow label="نمو" services={grow} />
            <ClusterRow label="تفاعل وقياس" services={engageAndMeasure} />
          </>
        ) : (
          <div className="rounded-2xl border border-border-dark bg-surface p-8 sm:p-10">
            <h2 className="font-display text-h3 font-semibold text-white">
              نحدّث تفاصيل خدماتنا
            </h2>
            <p className="mt-3 max-w-2xl text-white/65">
              تواصل معنا لمناقشة أهدافك، وسنوضح لك الخبرات المناسبة ونطاق العمل والخطوات التالية.
            </p>
          </div>
        )}
      </Section>

      <Section tone="surface">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-caption uppercase text-teal">تنفيذ منسق</p>
            <h2 className="mt-4 heading-h2 text-balance text-white">
              اجمع فقط الخبرات{' '}
              <span className="text-teal">التي تتطلبها أهدافك.</span>
            </h2>
            <p className="mt-4 text-body-lg text-white/70">
              عندما تتبع الاستراتيجية والتصميم والتقنية والمحتوى والحملات والقياس
              الأولويات نفسها، يصبح تنسيق القرارات وتقييم النتائج أكثر وضوحًا. نحدد خارطة
              طريق واحدة ونوضح المسؤوليات طوال فترة العمل.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {[
              'تطوير الويب + SEO + تحليلات',
              'تطوير الويب + UI/UX + إعلانات مدفوعة',
              'تطبيقات iOS وAndroid + UI/UX + تحليلات',
              'SEO + محتوى + إعلانات مدفوعة',
              'منصات التواصل + إدارة المجتمعات',
              'تطوير الويب + تطبيقات + UI/UX',
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
          description="تشرح صفحة كل خدمة المخرجات المعتادة وآلية العمل والأدوات والأسئلة المرتبطة بها بمزيد من التفصيل."
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
        heading="لست متأكدًا من الخدمة الأنسب؟"
        body="أخبرنا بما تريد تحسينه وما الذي يعيقك، وسنقترح نقطة بداية عملية."
        ctaLabel="ناقش احتياجاتك"
        ctaHref="/ar/contact"
      />
    </>
  )
}
