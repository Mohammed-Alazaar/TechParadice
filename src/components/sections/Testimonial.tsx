import { Section } from '@/components/ui/Section'

type TestimonialProps = {
  locale?: 'en' | 'ar'
}

export function Testimonial({ locale = 'en' }: TestimonialProps) {
  const isArabic = locale === 'ar'

  return (
    <Section tone="void">
      <figure className="relative mx-auto max-w-4xl text-center">
        <span
          aria-hidden
          className="absolute -top-8 left-0 font-display text-[180px] font-extrabold leading-none text-teal/30 sm:left-4 sm:-top-12 sm:text-[240px]"
        >
          “
        </span>
        <blockquote className="relative font-display text-[28px] font-semibold leading-tight text-void dark:text-white sm:text-[36px]">
          {isArabic
            ? 'الحل الرقمي المناسب يبسّط القرارات، ويزيل العقبات، ويرسم مسارًا واضحًا من جذب الانتباه إلى اتخاذ الإجراء.'
            : 'The right digital solution simplifies decisions, removes friction, and creates a clear path from attention to action.'}
        </blockquote>
        <figcaption className="mt-8 flex items-center justify-center gap-3 text-[14px] text-muted">
          <span className="font-semibold text-void dark:text-white">TechParadice</span>
          <span className="text-teal">/</span>
          <span>{isArabic ? 'مبدأ عمل' : 'Working principle'}</span>
        </figcaption>
      </figure>
    </Section>
  )
}
