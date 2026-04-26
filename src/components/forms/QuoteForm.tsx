'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

const quoteSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  projectType: z.string().min(1),
  budget: z.string().min(1),
  timeline: z.string().min(1),
  services: z.array(z.string()).min(1),
  message: z.string().min(10),
})

type QuoteInput = z.infer<typeof quoteSchema>

const copy = {
  en: {
    name: 'Your name', namePh: 'Jane Doe',
    email: 'Email', emailPh: 'jane@company.com',
    company: 'Company (optional)', companyPh: 'Acme Inc.',
    projectType: 'Project type',
    budget: 'Budget',
    timeline: 'Timeline',
    servicesLabel: 'Services interested in',
    message: 'Tell us about your project', messagePh: 'Goals, challenges, anything you want us to know…',
    send: 'Request a quote', sending: 'Sending…',
    successTitle: "Thanks — we've got it.",
    successBody: 'We review every request personally and reply within 24 hours.',
    projectTypes: [
      { value: '', label: 'Choose…' },
      { value: 'new', label: 'New project' },
      { value: 'redesign', label: 'Redesign / rebuild' },
      { value: 'ongoing', label: 'Ongoing retainer' },
    ],
    budgets: [
      { value: '', label: 'Choose…' },
      { value: '0-500', label: '$0 – $500' },
      { value: '500-1000', label: '$500 – $1,000' },
      { value: '1000-2000', label: '$1,000 – $2,000' },
      { value: '2000-5000', label: '$2,000 – $5,000' },
      { value: '5000+', label: 'Above $5,000' },
    ],
    timelines: [
      { value: '', label: 'Choose…' },
      { value: 'urgent', label: 'ASAP' },
      { value: '1-3m', label: '1–3 months' },
      { value: '3-6m', label: '3–6 months' },
      { value: 'flex', label: 'Flexible' },
    ],
    services: [
      { slug: 'web-development', name: 'Website Development' },
      { slug: 'mobile-app-development', name: 'Mobile App Development' },
      { slug: 'ui-ux-design', name: 'Custom UI/UX Design' },
      { slug: 'seo', name: 'SEO' },
      { slug: 'social-media-management', name: 'Social Media Management' },
      { slug: 'content-creation', name: 'Content Creation' },
      { slug: 'community-management', name: 'Community Management' },
      { slug: 'analytics-reporting', name: 'Analytics & Reporting' },
      { slug: 'paid-advertising', name: 'Paid Advertising' },
    ],
  },
  ar: {
    name: 'اسمك', namePh: 'أحمد محمد',
    email: 'البريد الإلكتروني', emailPh: 'ahmed@company.com',
    company: 'الشركة (اختياري)', companyPh: 'شركة أكمي',
    projectType: 'نوع المشروع',
    budget: 'الميزانية',
    timeline: 'الجدول الزمني',
    servicesLabel: 'الخدمات المطلوبة',
    message: 'أخبرنا عن مشروعك', messagePh: 'الأهداف، التحديات، أي شيء تريدنا أن نعرفه…',
    send: 'طلب عرض سعر', sending: 'جارٍ الإرسال…',
    successTitle: 'شكراً — تم الاستلام.',
    successBody: 'نراجع كل طلب شخصياً ونرد خلال 24 ساعة.',
    projectTypes: [
      { value: '', label: 'اختر…' },
      { value: 'new', label: 'مشروع جديد' },
      { value: 'redesign', label: 'إعادة تصميم / بناء' },
      { value: 'ongoing', label: 'عقد مستمر' },
    ],
    budgets: [
      { value: '', label: 'اختر…' },
      { value: '0-500', label: '$0 – $500' },
      { value: '500-1000', label: '$500 – $1,000' },
      { value: '1000-2000', label: '$1,000 – $2,000' },
      { value: '2000-5000', label: '$2,000 – $5,000' },
      { value: '5000+', label: 'أكثر من $5,000' },
    ],
    timelines: [
      { value: '', label: 'اختر…' },
      { value: 'urgent', label: 'في أقرب وقت' },
      { value: '1-3m', label: '1–3 أشهر' },
      { value: '3-6m', label: '3–6 أشهر' },
      { value: 'flex', label: 'مرن' },
    ],
    services: [
      { slug: 'web-development', name: 'تطوير مواقع الويب' },
      { slug: 'mobile-app-development', name: 'تطوير تطبيقات الجوال' },
      { slug: 'ui-ux-design', name: 'تصميم UI/UX مخصص' },
      { slug: 'seo', name: 'تحسين محركات البحث' },
      { slug: 'social-media-management', name: 'إدارة التواصل الاجتماعي' },
      { slug: 'content-creation', name: 'إنشاء المحتوى' },
      { slug: 'community-management', name: 'إدارة المجتمع' },
      { slug: 'analytics-reporting', name: 'التحليلات والتقارير' },
      { slug: 'paid-advertising', name: 'الإعلانات المدفوعة' },
    ],
  },
}

interface QuoteFormProps {
  locale?: 'en' | 'ar'
}

export function QuoteForm({ locale = 'en' }: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const t = copy[locale]
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { services: [] },
  })

  async function onSubmit(data: QuoteInput) {
    const res = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      setSubmitted(true)
      reset()
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-teal/30 bg-teal/5 p-8 text-center">
        <CheckCircle2 className="mx-auto text-teal" size={36} />
        <h3 className="mt-4 heading-h3 text-void dark:text-white">{t.successTitle}</h3>
        <p className="mt-2 text-void/70 dark:text-white/70">{t.successBody}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" aria-label={t.send}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label={t.name} placeholder={t.namePh} {...register('name')} />
        <Input label={t.email} type="email" placeholder={t.emailPh} {...register('email')} />
      </div>

      <Input label={t.company} placeholder={t.companyPh} {...register('company')} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Select label={t.projectType} {...register('projectType')} options={t.projectTypes} />
        <Select label={t.budget} {...register('budget')} options={t.budgets} />
        <Select label={t.timeline} {...register('timeline')} options={t.timelines} />
      </div>

      <fieldset>
        <legend className="mb-3 text-[13px] font-medium text-muted">{t.servicesLabel}</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.map((s) => (
            <label
              key={s.slug}
              className="flex cursor-pointer items-start gap-3 rounded-md border border-border-light bg-white p-3 text-[14px] text-void/80 transition-colors hover:border-teal/40 hover:text-void dark:border-border-dark dark:bg-void dark:text-white/80 dark:hover:text-white"
            >
              <input
                type="checkbox"
                value={s.slug}
                {...register('services')}
                className="mt-0.5 h-4 w-4 accent-teal"
              />
              {s.name}
            </label>
          ))}
        </div>
      </fieldset>

      <Textarea label={t.message} placeholder={t.messagePh} {...register('message')} />

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={16} />
            {t.sending}
          </>
        ) : (
          t.send
        )}
      </Button>
    </form>
  )
}
