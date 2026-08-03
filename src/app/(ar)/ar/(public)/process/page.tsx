import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Faq } from '@/components/sections/Faq'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'مراحل العمل',
  description:
    'تعرّف إلى منهج TechParadice من الاكتشاف والاستراتيجية إلى التصميم والتطوير وضمان الجودة والإطلاق والتحسين المستمر.',
  path: '/ar/process',
  alternatePath: '/process',
  locale: 'ar',
})

const phases = [
  {
    n: '01', name: 'الاكتشاف',
    what: 'نراجع الوضع الحالي، ونتحدث مع أصحاب المصلحة الرئيسيين، ونتفق على أهداف العمل واحتياجات الجمهور والقيود والأدلة المتاحة.',
    deliverables: ['أهداف متفق عليها', 'مقاييس النجاح', 'موجز المشروع'],
    timeline: 'في بداية المشروع', who: 'المؤسس وقائد الاستراتيجية',
  },
  {
    n: '02', name: 'الاستراتيجية',
    what: 'نحوّل الأهداف المتفق عليها إلى نطاق عملي وتسلسل للتنفيذ وخطة للقياس وهيكل للفريق ومجموعة واضحة من الأولويات.',
    deliverables: ['نطاق العمل', 'خطة المراحل', 'المخاطر والافتراضات'],
    timeline: 'بعد الاتفاق على الأهداف', who: 'المؤسس وقائد المشروع',
  },
  {
    n: '03', name: 'التصميم',
    what: 'نصوغ بنية المعلومات ورحلات المستخدم والواجهات والتوجه البصري، مع نقاط مراجعة مخططة قبل اعتماد التصميم التفصيلي.',
    deliverables: ['مخططات الواجهات', 'نماذج تفاعلية', 'نظام التصميم'],
    timeline: 'وفق النطاق ونقاط المراجعة', who: 'فريق التصميم وقائد المشروع',
  },
  {
    n: '04', name: 'التطوير',
    what: 'نطوّر التجربة المعتمدة على مراحل قابلة للمراجعة، ونشارك التقدم في بيئة تجريبية، ونعالج الأسئلة عند ظهورها.',
    deliverables: ['بيئة تجريبية', 'مراجعات التقدم', 'مكونات خضعت للاختبار'],
    timeline: 'وفق النطاق والتكاملات', who: 'فريق التطوير وQA وقائد المشروع',
  },
  {
    n: '05', name: 'ضمان الجودة',
    what: 'نراجع إتاحة الوصول والمحتوى والتجاوب وتوافق المتصفحات والتحليلات والتكاملات والأداء قبل الإصدار.',
    deliverables: ['مراجعة إتاحة الوصول', 'تقرير الأداء', 'سجل الملاحظات حسب الأولوية'],
    timeline: 'قبل الإطلاق', who: 'QA وفريق التطوير',
  },
  {
    n: '06', name: 'الإطلاق',
    what: 'بعد الاعتماد النهائي، نستكمل خطة الإصدار، ونتحقق من التحليلات والرحلات الأساسية، ونقدم الوثائق المتفق عليها.',
    deliverables: ['الإصدار النهائي', 'التحقق من التحليلات', 'دليل التسليم'],
    timeline: 'في تاريخ الإصدار المتفق عليه', who: 'المؤسس وفريق التطوير',
  },
  {
    n: '07', name: 'التحسين',
    what: 'عندما يشمل الاتفاق دعماً مستمراً، نراجع الأداء ونجمع الأدلة ونرتب التحسينات التالية مع فريقك حسب الأولوية.',
    deliverables: ['مراجعة الأداء', 'أولويات محدثة', 'أعمال التحسين'],
    timeline: 'وفق اتفاق الدعم', who: 'فريق التنفيذ المتفق عليه',
  },
]

const processFaqs = [
  {
    q: 'ما المدة المعتادة للتعاون؟',
    a: 'تعتمد المدة على النطاق وجاهزية المحتوى والتكاملات ودورات المراجعة والعوامل التي يعتمد عليها المشروع. لذلك يتضمن عرض العمل جدولاً زمنياً مخصصاً للمشروع بعد تحديد هذه العناصر.',
  },
  {
    q: 'كم مرة نجتمع؟',
    a: 'نتفق عند بدء المشروع على وتيرة الاجتماعات وقنوات التواصل ونقاط المراجعة بما يلائم الفريق والنطاق، مع إمكانية إضافة مراجعات عند المراحل المهمة.',
  },
  {
    q: 'ما الأدوات التي نستخدمها معاً؟',
    a: 'نحدد أدوات التصميم وتتبع العمل وإدارة الكود والتواصل وفق متطلبات المشروع والأنظمة المعتمدة لدى مؤسستك واحتياجات الأمان.',
  },
  {
    q: 'هل يمكنكم العمل مع فريقنا الداخلي؟',
    a: 'نعم. يمكننا التعاون مع فرق التطوير والتصميم والتسويق والمحتوى والعمليات الداخلية، مع تحديد المسؤوليات وصلاحيات اتخاذ القرار منذ البداية.',
  },
]

export default function ArProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="كيف نعمل"
        title={<>مسار واضح من <span className="text-teal">موجز المشروع إلى تقدم يمكن قياسه.</span></>}
        description="إطار من سبع مراحل يوضح القرارات والمسؤوليات ونقاط المراجعة والتقدم طوال مدة التعاون."
      />

      <Section tone="void" className="pt-0">
        <ol className="space-y-6">
          {phases.map((phase) => (
            <li
              key={phase.n}
              className="grid gap-6 rounded-2xl border border-border-dark bg-surface p-8 lg:grid-cols-[80px_1fr_1fr]"
            >
              <div>
                <span className="font-display text-[40px] font-extrabold leading-none text-teal">
                  {phase.n}
                </span>
              </div>
              <div>
                <h2 className="font-display text-h3 font-semibold text-white">{phase.name}</h2>
                <p className="mt-2 text-[15px] text-white/70">{phase.what}</p>
                <p className="mt-4 text-[13px] text-muted">{phase.who}</p>
              </div>
              <div>
                <p className="text-caption uppercase text-teal">المخرجات</p>
                <ul className="mt-3 space-y-1.5">
                  {phase.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-[14px] text-white/70">
                      <span className="h-px w-4 bg-teal/50 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[13px] text-teal/70">{phase.timeline}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="الأسئلة الشائعة" title="حول مراحل العمل" />
          <Faq items={processFaqs} />
        </div>
      </Section>

      <CtaBanner
        heading="هل لديك مشروع تريد تحويله إلى خطة؟"
        body="شاركنا أهدافك وقيودك ووضعك الحالي. سنساعدك على تحديد النطاق ونقطة البداية المناسبين."
        ctaLabel="ناقش مشروعك"
        ctaHref="/ar/contact"
      />
    </>
  )
}
