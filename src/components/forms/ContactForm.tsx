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
    company: 'Company (optional)', companyPh: 'Your company',
    interest: 'How can we help?',
    budget: 'Budget (optional)',
    message: 'Tell us about your goals', messagePh: 'What would you like to achieve, improve, or launch?',
    send: 'Send message', sending: 'Sending…',
    successTitle: 'Thank you — your message is with us.',
    successBody: 'Mohammed will review it personally and aims to respond within one business day.',
    services: [
      { value: '', label: 'Choose…' },
      { value: 'web-development', label: 'Website Development' },
      { value: 'mobile-app-development', label: 'Mobile App Development' },
      { value: 'ui-ux-design', label: 'Custom UI/UX Design' },
      { value: 'seo', label: 'SEO' },
      { value: 'content-creation', label: 'Content Creation' },
      { value: 'paid-advertising', label: 'Paid Advertising' },
      { value: 'voice-ai-receptionist', label: 'Voice AI Receptionist' },
      { value: 'customer-support-ai', label: 'Customer Support AI' },
      { value: 'sales-lead-qualification-ai', label: 'Sales & Lead Qualification AI' },
      { value: 'business-analytics-ai', label: 'Business Analytics AI' },
      { value: 'internal-knowledge-ai', label: 'Internal Knowledge AI' },
      { value: 'meeting-executive-ai', label: 'Meeting & Executive AI' },
      { value: 'multi', label: 'Multiple services / not sure yet' },
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
    company: 'الشركة (اختياري)', companyPh: 'اسم شركتك',
    interest: 'الخدمة المطلوبة',
    budget: 'الميزانية (اختياري)',
    message: 'أخبرنا عن أهدافك', messagePh: 'ما الذي ترغب في إطلاقه أو تطويره أو تحسينه؟',
    send: 'إرسال الرسالة', sending: 'جارٍ الإرسال…',
    successTitle: 'شكراً لك — وصلتنا رسالتك.',
    successBody: 'سيراجع محمد رسالتك شخصياً، ويسعى إلى الرد خلال يوم عمل واحد.',
    services: [
      { value: '', label: 'اختر…' },
      { value: 'web-development', label: 'تطوير المواقع' },
      { value: 'mobile-app-development', label: 'تطوير تطبيقات الجوال' },
      { value: 'ui-ux-design', label: 'تصميم UI/UX مخصص' },
      { value: 'seo', label: 'SEO' },
      { value: 'content-creation', label: 'إنتاج المحتوى' },
      { value: 'paid-advertising', label: 'الإعلانات المدفوعة' },
      { value: 'voice-ai-receptionist', label: 'مساعد الاستقبال الذكي الصوتي' },
      { value: 'customer-support-ai', label: 'مساعد خدمة العملاء الذكي' },
      { value: 'sales-lead-qualification-ai', label: 'مساعد المبيعات وتأهيل العملاء' },
      { value: 'business-analytics-ai', label: 'مساعد تحليل الأعمال الذكي' },
      { value: 'internal-knowledge-ai', label: 'مساعد المعرفة الداخلية' },
      { value: 'meeting-executive-ai', label: 'مساعد الاجتماعات والمدير التنفيذي' },
      { value: 'multi', label: 'عدة خدمات أو لم أحدد بعد' },
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
