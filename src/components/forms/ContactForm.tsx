'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  interest: z.string().min(1),
  budget: z.string().optional(),
  message: z.string().min(10),
})

type ContactInput = z.infer<typeof contactSchema>

const copy = {
  en: {
    name: 'Your name', namePh: 'Jane Doe',
    email: 'Email', emailPh: 'jane@company.com',
    company: 'Company (optional)', companyPh: 'Acme Inc.',
    interest: 'Service interest',
    budget: 'Budget (optional)',
    message: 'Your message', messagePh: "Tell us what you're working on…",
    send: 'Send message', sending: 'Sending…',
    successTitle: 'Message received.',
    successBody: 'Mohammed will read this personally and reply within 24 hours.',
    services: [
      { value: '', label: 'Choose…' },
      { value: 'web', label: 'Website Development' },
      { value: 'mobile', label: 'Mobile App Development' },
      { value: 'design', label: 'UI/UX Design' },
      { value: 'seo', label: 'SEO' },
      { value: 'social', label: 'Social Media' },
      { value: 'content', label: 'Content Creation' },
      { value: 'community', label: 'Community Management' },
      { value: 'analytics', label: 'Analytics & Reporting' },
      { value: 'paid', label: 'Paid Advertising' },
      { value: 'multi', label: 'Multiple / not sure' },
    ],
    budgets: [
      { value: '', label: 'Choose…' },
      { value: '0-500', label: '$0 – $500' },
      { value: '500-1000', label: '$500 – $1,000' },
      { value: '1000-2000', label: '$1,000 – $2,000' },
      { value: '2000-5000', label: '$2,000 – $5,000' },
      { value: '5000+', label: 'Above $5,000' },
    ],
  },
  ar: {
    name: 'اسمك', namePh: 'أحمد محمد',
    email: 'البريد الإلكتروني', emailPh: 'ahmed@company.com',
    company: 'الشركة (اختياري)', companyPh: 'شركة أكمي',
    interest: 'الخدمة المطلوبة',
    budget: 'الميزانية (اختياري)',
    message: 'رسالتك', messagePh: 'أخبرنا ما الذي تعمل عليه…',
    send: 'إرسال الرسالة', sending: 'جارٍ الإرسال…',
    successTitle: 'تم استلام رسالتك.',
    successBody: 'سيقرأ محمد رسالتك شخصياً ويرد خلال 24 ساعة.',
    services: [
      { value: '', label: 'اختر…' },
      { value: 'web', label: 'تطوير مواقع الويب' },
      { value: 'mobile', label: 'تطوير تطبيقات الجوال' },
      { value: 'design', label: 'تصميم UI/UX' },
      { value: 'seo', label: 'تحسين محركات البحث (SEO)' },
      { value: 'social', label: 'إدارة التواصل الاجتماعي' },
      { value: 'content', label: 'إنشاء المحتوى' },
      { value: 'community', label: 'إدارة المجتمع' },
      { value: 'analytics', label: 'التحليلات والتقارير' },
      { value: 'paid', label: 'الإعلانات المدفوعة' },
      { value: 'multi', label: 'متعددة / غير محددة' },
    ],
    budgets: [
      { value: '', label: 'اختر…' },
      { value: '0-500', label: '$0 – $500' },
      { value: '500-1000', label: '$500 – $1,000' },
      { value: '1000-2000', label: '$1,000 – $2,000' },
      { value: '2000-5000', label: '$2,000 – $5,000' },
      { value: '5000+', label: 'أكثر من $5,000' },
    ],
  },
}

interface ContactFormProps {
  locale?: 'en' | 'ar'
}

export function ContactForm({ locale = 'en' }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const t = copy[locale]
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) })

  async function onSubmit(data: ContactInput) {
    const res = await fetch('/api/contact', {
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select label={t.interest} {...register('interest')} options={t.services} />
        <Select label={t.budget} {...register('budget')} options={t.budgets} />
      </div>

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
