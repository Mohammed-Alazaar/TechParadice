'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

const contactSchema = z.object({
  name: z.string().min(2, 'Please share your name'),
  email: z.string().email('Please share a valid email'),
  company: z.string().optional(),
  interest: z.string().min(1, 'Pick a service of interest'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Tell us a bit more (10+ characters)'),
})

type ContactInput = z.infer<typeof contactSchema>

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
        <h3 className="mt-4 heading-h3 text-white">Message received.</h3>
        <p className="mt-2 text-white/70">
          Mohammed will read this personally and reply within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" aria-label="Contact form">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Your name"
          placeholder="Jane Doe"
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          label="Email"
          type="email"
          placeholder="jane@company.com"
          {...register('email')}
          error={errors.email?.message}
        />
      </div>

      <Input
        label="Company (optional)"
        placeholder="Acme Inc."
        {...register('company')}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Service interest"
          {...register('interest')}
          error={errors.interest?.message}
          options={[
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
          ]}
        />
        <Select
          label="Budget (optional)"
          {...register('budget')}
          options={[
            { value: '', label: 'Choose…' },
            { value: '<5k', label: 'Under $5k' },
            { value: '5-15k', label: '$5k – $15k' },
            { value: '15-40k', label: '$15k – $40k' },
            { value: '40-100k', label: '$40k – $100k' },
            { value: '100k+', label: '$100k+' },
          ]}
        />
      </div>

      <Textarea
        label="Your message"
        placeholder="Tell us what you’re working on…"
        {...register('message')}
        error={errors.message?.message}
      />

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={16} />
            Sending…
          </>
        ) : (
          'Send message'
        )}
      </Button>
    </form>
  )
}
