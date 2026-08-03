import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { BRAND, SITE_URL, ldJson } from '@/lib/utils'
import { ORG_REF, FOUNDER_ID, WEBSITE_REF } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

const AR_LOCATION = 'أنقرة، تركيا'

export const metadata: Metadata = buildMetadata({
  title: 'من نحن',
  description: 'تعرّف إلى TechParadice، فريق رقمي بقيادة مؤسسه من أنقرة، تدعمه خبرات متخصصة وفق احتياجات كل مشروع.',
  path: '/ar/about',
  alternatePath: '/about',
  locale: 'ar',
})

const values = [
  { title: 'الوضوح أولًا', body: 'أولويات ومخرجات ومؤشرات نجاح وآلية تواصل واضحة منذ اليوم الأول.' },
  { title: 'خبرات متخصصة', body: 'نختار كل مساهم وفق المهارات والخبرة التي يحتاج إليها مشروعك.' },
  { title: 'تسعير شفاف', body: 'نتفق على نطاق العمل والرسوم مسبقًا، ونناقش أي تغيير قبل تنفيذه.' },
  { title: 'مخرجات مفيدة', body: 'نركز على ما ينبغي أن يحققه العمل لعملائك ولنشاطك.' },
]

const disciplines = [
  'استراتيجية المنتجات',
  'تصميم UI/UX',
  'تطوير الواجهات الأمامية',
  'تطوير تطبيقات iOS وAndroid',
  'SEO والتحليلات',
  'الإعلانات المدفوعة',
  'استراتيجية المحتوى وكتابته',
  'إدارة المجتمعات والعمليات',
]

export default function ArAboutPage() {
  // Same entity as the English page: mainEntity/worksFor reference the layout's
  // Organization by @id. The previous inline copy also set url to ${SITE_URL}/ar,
  // which is a language section rather than the organisation's canonical URL.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${SITE_URL}/ar/about#webpage`,
        name: `من نحن — ${BRAND.name}`,
        url: `${SITE_URL}/ar/about`,
        inLanguage: 'ar',
        isPartOf: WEBSITE_REF,
        about: ORG_REF,
        mainEntity: ORG_REF,
      },
      {
        '@type': 'Person',
        '@id': FOUNDER_ID,
        name: BRAND.owner,
        jobTitle: 'المؤسس',
        worksFor: ORG_REF,
        homeLocation: { '@type': 'Place', name: AR_LOCATION },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/ar/about#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${SITE_URL}/ar` },
          { '@type': 'ListItem', position: 2, name: 'من نحن', item: `${SITE_URL}/ar/about` },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }}
      />
      <PageHero
        eyebrow="من نحن"
        title={
          <>
            فريق رقمي مركز،{' '}
            <span className="text-teal">بقيادة مؤسسه.</span>
          </>
        }
        description={`يقود ${BRAND.owner} فريق TechParadice من ${AR_LOCATION}. تحصل على شريك واحد مسؤول ينسق الاستراتيجية والتصميم والتقنية والنمو.`}
      />

      <Section tone="void" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-caption uppercase text-teal">قصتنا</p>
            <div className="mt-4 space-y-4 text-body-lg text-white/75">
              <p>
                أسست TechParadice لأن الشركات لا ينبغي أن تضطر إلى التنسيق بين جهات منفصلة
                لتحسين رحلة رقمية واحدة. تعمل المواقع والحملات والمحتوى والتحليلات بصورة أفضل
                عندما تتبع الأولويات نفسها.
              </p>
              <p>
                نجمع هذه الخبرات ضمن خطة واحدة ومسؤول واضح، مع المزيج المناسب من المتخصصين
                في الويب والتطبيقات والتصميم وSEO والمحتوى ووسائل التواصل الاجتماعي
                والتحليلات والإعلانات المدفوعة.
              </p>
              <p>
                يجمع نموذجنا فريقًا أساسيًا صغيرًا مع شبكة من المتخصصين. نُشكّل الفريق وفق
                متطلبات العمل، ونحافظ على تواصل مباشر، ونتحمل المسؤولية من التخطيط حتى الإطلاق.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-border-dark bg-surface p-8">
            <p className="text-caption uppercase text-teal">المؤسس</p>
            <p className="mt-4 font-display text-h2 font-bold text-white">{BRAND.owner}</p>
            <p className="mt-1 text-muted">{AR_LOCATION}</p>
            <div className="mt-6 space-y-3 text-[15px] text-white/70">
              <p>مهندس ورائد أعمال لديه خبرة في بناء المنتجات الرقمية وإطلاقها وتطويرها.</p>
              <p>
                يشارك مباشرة في الاستراتيجية وتوجيه التصميم والقرارات التقنية، من مرحلة
                الاستكشاف حتى الإطلاق.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="ما نؤمن به" title="أربعة مبادئ توجه عملنا" />
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <li key={v.title} className="rounded-xl border border-border-dark bg-void p-6">
              <span className="mb-3 inline-block h-px w-8 bg-teal" />
              <h3 className="font-display text-h4 font-semibold text-white">{v.title}</h3>
              <p className="mt-2 text-[14px] text-white/60">{v.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="void">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="شبكة المتخصصين"
            title={<>الخبرات المناسبة، <span className="text-teal">بقيادة ${BRAND.owner}.</span></>}
            description="نُشكّل كل فريق وفق المشروع. نختار المساهمين لخبرتهم ذات الصلة، ونحدد لهم نطاقًا واضحًا، ونعمل جميعًا وفق معايير تنفيذ مشتركة."
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

      <CtaBanner
        heading="هل تبحث عن شريك رقمي يفهم أهدافك؟"
        body="شاركنا التحدي الذي تعمل عليه، وسنساعدك على تحديد الخطوة التالية بوضوح."
        ctaLabel="ابدأ المحادثة"
        ctaHref="/ar/contact"
      />
    </>
  )
}
