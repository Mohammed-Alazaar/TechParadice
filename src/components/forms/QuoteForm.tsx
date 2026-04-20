'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
const services = [
  { slug: 'web-development', name: 'Website Development' },
  { slug: 'mobile-app-development', name: 'Mobile App Development' },
  { slug: 'ui-ux-design', name: 'Custom UI/UX Design' },
  { slug: 'seo', name: 'SEO' },
  { slug: 'social-media-management', name: 'Social Media Management' },
  { slug: 'content-creation', name: 'Content Creation' },
  { slug: 'community-management', name: 'Community Management' },
  { slug: 'analytics-reporting', name: 'Analytics & Reporting' },
  { slug: 'paid-advertising', name: 'Paid Advertising' },
]

const quoteSchema = z.object({
  name: z.string().min(2, 'Please share your name'),
  email: z.string().email('Please share a valid email'),
  company: z.string().optional(),
  projectType: z.string().min(1, 'Pick a project type'),
  budget: z.string().min(1, 'Pick a budget range'),
  timeline: z.string().min(1, 'Pick a timeline'),
  services: z.array(z.string()).min(1, 'Pick at least one service'),
  message: z.string().min(10, 'Tell us a bit more (10+ characters)'),
})

type QuoteInput = z.infer<typeof quoteSchema>

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
        <h3 className="mt-4 heading-h3 text-white">Thanks — we’ve got it.</h3>
        <p className="mt-2 text-white/70">
          We review every request personally and reply within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      aria-label="Request a quote"
    >
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Select
          label="Project type"
          {...register('projectType')}
          error={errors.projectType?.message}
          options={[
            { value: '', label: 'Choose…' },
            { value: 'new', label: 'New project' },
            { value: 'redesign', label: 'Redesign / rebuild' },
            { value: 'ongoing', label: 'Ongoing retainer' },
          ]}
        />
        <Select
          label="Budget"
          {...register('budget')}
          error={errors.budget?.message}
          options={[
            { value: '', label: 'Choose…' },
            { value: '5-15k', label: '$5k – $15k' },
            { value: '15-40k', label: '$15k – $40k' },
            { value: '40-100k', label: '$40k – $100k' },
            { value: '100k+', label: '$100k+' },
          ]}
        />
        <Select
          label="Timeline"
          {...register('timeline')}
          error={errors.timeline?.message}
          options={[
            { value: '', label: 'Choose…' },
            { value: 'urgent', label: 'ASAP' },
            { value: '1-3m', label: '1–3 months' },
            { value: '3-6m', label: '3–6 months' },
            { value: 'flex', label: 'Flexible' },
          ]}
        />
      </div>

      <fieldset>
        <legend className="mb-3 text-[13px] font-medium text-muted">
          Services interested in
        </legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <label
              key={s.slug}
              className="flex cursor-pointer items-start gap-3 rounded-md border border-border-dark bg-void p-3 text-[14px] text-white/80 transition-colors hover:border-teal/40 hover:text-white"
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
        {errors.services ? (
          <p className="mt-2 text-[12px] text-danger">
            {errors.services.message}
          </p>
        ) : null}
      </fieldset>

      <Textarea
        label="Tell us about your project"
        placeholder="Goals, challenges, anything you want us to know…"
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
          'Request a quote'
        )}
      </Button>
    </form>
  )
}
