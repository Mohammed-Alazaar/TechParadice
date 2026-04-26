'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ImageUpload } from '@/components/admin/ImageUpload'

interface PortfolioFormProps {
  initialData?: {
    slug: string
    client: string
    title: string
    industry: string
    services: string[]
    timeline: string
    year: string
    outcome: string
    cover?: string
    challenge: string
    approach: string[]
    solution: string[]
    results: { value: string; label: string }[]
    testimonial?: { quote: string; author: string; role: string }
    published: boolean
    titleAr?: string
    outcomeAr?: string
    challengeAr?: string
    approachAr?: string[]
    solutionAr?: string[]
    resultsAr?: { value: string; label: string }[]
    testimonialAr?: { quote: string; author: string; role: string }
    publishedAr?: boolean
  }
}

function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

const REQUIRED: string[] = ['slug', 'client', 'title', 'industry', 'timeline', 'year', 'outcome', 'challenge']

const emptyForm = {
  slug: '', client: '', title: '', industry: '', services: '',
  timeline: '', year: String(new Date().getFullYear()), outcome: '',
  cover: '', challenge: '', approach: '', solution: '',
  results: [{ value: '', label: '' }] as { value: string; label: string }[],
  testimonialQuote: '', testimonialAuthor: '', testimonialRole: '',
  published: true,
  titleAr: '', outcomeAr: '', challengeAr: '', approachAr: '', solutionAr: '',
  resultsAr: [{ value: '', label: '' }] as { value: string; label: string }[],
  testimonialArQuote: '', testimonialArAuthor: '', testimonialArRole: '',
  publishedAr: false,
}

export function PortfolioForm({ initialData }: PortfolioFormProps) {
  const router = useRouter()
  const isEdit = Boolean(initialData?.slug)
  const [tab, setTab] = useState<'en' | 'ar'>('en')

  const [form, setForm] = useState({
    ...emptyForm,
    slug: initialData?.slug ?? '',
    client: initialData?.client ?? '',
    title: initialData?.title ?? '',
    industry: initialData?.industry ?? '',
    services: initialData?.services?.join(', ') ?? '',
    timeline: initialData?.timeline ?? '',
    year: initialData?.year ?? String(new Date().getFullYear()),
    outcome: initialData?.outcome ?? '',
    cover: initialData?.cover ?? '',
    challenge: initialData?.challenge ?? '',
    approach: initialData?.approach?.join('\n') ?? '',
    solution: initialData?.solution?.join('\n') ?? '',
    results: initialData?.results ?? [{ value: '', label: '' }],
    testimonialQuote: initialData?.testimonial?.quote ?? '',
    testimonialAuthor: initialData?.testimonial?.author ?? '',
    testimonialRole: initialData?.testimonial?.role ?? '',
    published: initialData?.published ?? true,
    titleAr: initialData?.titleAr ?? '',
    outcomeAr: initialData?.outcomeAr ?? '',
    challengeAr: initialData?.challengeAr ?? '',
    approachAr: initialData?.approachAr?.join('\n') ?? '',
    solutionAr: initialData?.solutionAr?.join('\n') ?? '',
    resultsAr: initialData?.resultsAr ?? [{ value: '', label: '' }],
    testimonialArQuote: initialData?.testimonialAr?.quote ?? '',
    testimonialArAuthor: initialData?.testimonialAr?.author ?? '',
    testimonialArRole: initialData?.testimonialAr?.role ?? '',
    publishedAr: initialData?.publishedAr ?? false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function set(key: string, value: unknown) {
    setErrors((e) => { const next = { ...e }; delete next[key]; return next })
    setForm((f) => {
      const next = { ...f, [key]: value }
      if (key === 'title' && !isEdit && (f.slug === '' || f.slug === slugify(f.title))) {
        next.slug = slugify(value as string)
      }
      return next
    })
  }

  function setResult(i: number, key: 'value' | 'label', val: string) {
    setForm((f) => {
      const results = [...f.results]
      results[i] = { ...results[i], [key]: val }
      return { ...f, results }
    })
  }

  function setResultAr(i: number, key: 'value' | 'label', val: string) {
    setForm((f) => {
      const resultsAr = [...f.resultsAr]
      resultsAr[i] = { ...resultsAr[i], [key]: val }
      return { ...f, resultsAr }
    })
  }

  function validate() {
    const next: Record<string, string> = {}
    for (const field of REQUIRED) {
      const val = (form as any)[field]
      if (typeof val === 'string' && !val.trim()) next[field] = 'This field is required'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSave() {
    if (!validate()) return
    setSaving(true)
    setSubmitError('')

    const payload = {
      slug: form.slug, client: form.client, title: form.title,
      industry: form.industry,
      services: form.services.split(',').map((s) => s.trim()).filter(Boolean),
      timeline: form.timeline, year: form.year, outcome: form.outcome,
      cover: form.cover,
      challenge: form.challenge,
      approach: form.approach.split('\n').map((s) => s.trim()).filter(Boolean),
      solution: form.solution.split('\n').map((s) => s.trim()).filter(Boolean),
      results: form.results.filter((r) => r.value && r.label),
      testimonial: form.testimonialQuote
        ? { quote: form.testimonialQuote, author: form.testimonialAuthor, role: form.testimonialRole }
        : undefined,
      published: form.published,
      titleAr: form.titleAr || undefined,
      outcomeAr: form.outcomeAr || undefined,
      challengeAr: form.challengeAr || undefined,
      approachAr: form.approachAr ? form.approachAr.split('\n').map((s) => s.trim()).filter(Boolean) : [],
      solutionAr: form.solutionAr ? form.solutionAr.split('\n').map((s) => s.trim()).filter(Boolean) : [],
      resultsAr: form.resultsAr.filter((r) => r.value && r.label),
      testimonialAr: form.testimonialArQuote
        ? { quote: form.testimonialArQuote, author: form.testimonialArAuthor, role: form.testimonialArRole }
        : undefined,
      publishedAr: form.publishedAr,
    }

    const url = isEdit ? `/api/admin/portfolio/${initialData!.slug}` : '/api/admin/portfolio'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      router.push('/admin/portfolio')
      router.refresh()
    } else {
      const data = await res.json()
      setSubmitError(data.error ?? 'Failed to save')
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this case study?')) return
    await fetch(`/api/admin/portfolio/${initialData!.slug}`, { method: 'DELETE' })
    router.push('/admin/portfolio')
    router.refresh()
  }

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex gap-2 rounded-lg border border-white/10 bg-white/5 p-1 w-fit">
        <button
          type="button"
          onClick={() => setTab('en')}
          className={`rounded-md px-4 py-1.5 text-[13px] font-semibold transition-colors ${
            tab === 'en' ? 'bg-teal text-void' : 'text-white/60 hover:text-white'
          }`}
        >
          English
        </button>
        <button
          type="button"
          onClick={() => setTab('ar')}
          className={`rounded-md px-4 py-1.5 text-[13px] font-semibold transition-colors ${
            tab === 'ar' ? 'bg-teal text-void' : 'text-white/60 hover:text-white'
          }`}
        >
          العربية
        </button>
      </div>

      {tab === 'en' ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Client" error={errors.client}>
              <input value={form.client} onChange={(e) => set('client', e.target.value)} className={inp(errors.client)} />
            </Field>
            <Field label="Slug" error={errors.slug}>
              <input value={form.slug} onChange={(e) => set('slug', e.target.value)} className={inp(errors.slug)} />
            </Field>
          </div>
          <Field label="Title" error={errors.title}>
            <input value={form.title} onChange={(e) => set('title', e.target.value)} className={inp(errors.title)} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Industry" error={errors.industry}>
              <input value={form.industry} onChange={(e) => set('industry', e.target.value)} className={inp(errors.industry)} />
            </Field>
            <Field label="Outcome (e.g. +38% conversion)" error={errors.outcome}>
              <input value={form.outcome} onChange={(e) => set('outcome', e.target.value)} className={inp(errors.outcome)} />
            </Field>
            <Field label="Timeline (e.g. 12 weeks)" error={errors.timeline}>
              <input value={form.timeline} onChange={(e) => set('timeline', e.target.value)} className={inp(errors.timeline)} />
            </Field>
            <Field label="Year" error={errors.year}>
              <input value={form.year} onChange={(e) => set('year', e.target.value)} className={inp(errors.year)} />
            </Field>
          </div>
          <Field label="Services (comma-separated)">
            <input value={form.services} onChange={(e) => set('services', e.target.value)} className={inp()} placeholder="Web Development, UI/UX Design" />
          </Field>
          <Field label="Challenge" error={errors.challenge}>
            <textarea value={form.challenge} onChange={(e) => set('challenge', e.target.value)} rows={4} className={inp(errors.challenge)} />
          </Field>
          <Field label="Approach (one item per line)">
            <textarea value={form.approach} onChange={(e) => set('approach', e.target.value)} rows={4} className={inp()} />
          </Field>
          <Field label="Solution (one item per line)">
            <textarea value={form.solution} onChange={(e) => set('solution', e.target.value)} rows={4} className={inp()} />
          </Field>
          <div>
            <label className="mb-2 block text-[13px] font-medium text-white/70">Results</label>
            <div className="space-y-2">
              {form.results.map((r, i) => (
                <div key={i} className="flex gap-3">
                  <input value={r.value} onChange={(e) => setResult(i, 'value', e.target.value)} placeholder="Value (e.g. +38%)" className={`${inp()} flex-1`} />
                  <input value={r.label} onChange={(e) => setResult(i, 'label', e.target.value)} placeholder="Label (e.g. conversion)" className={`${inp()} flex-1`} />
                </div>
              ))}
              <button type="button" onClick={() => set('results', [...form.results, { value: '', label: '' }])} className="text-[12px] text-teal hover:underline">
                + Add result
              </button>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 p-4">
            <p className="mb-3 text-[13px] font-medium text-white/70">Testimonial (optional)</p>
            <div className="space-y-3">
              <textarea value={form.testimonialQuote} onChange={(e) => set('testimonialQuote', e.target.value)} rows={3} placeholder="Quote" className={inp()} />
              <div className="grid grid-cols-2 gap-3">
                <input value={form.testimonialAuthor} onChange={(e) => set('testimonialAuthor', e.target.value)} placeholder="Author name" className={inp()} />
                <input value={form.testimonialRole} onChange={(e) => set('testimonialRole', e.target.value)} placeholder="Role" className={inp()} />
              </div>
            </div>
          </div>
          <ImageUpload value={form.cover} onChange={(url) => set('cover', url)} />
          <label className="flex items-center gap-2 text-[13px] text-white/70">
            <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} className="accent-teal" />
            Published (English)
          </label>
        </>
      ) : (
        <>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-[12px] text-amber-400">
            Arabic content is served at <code dir="ltr">/ar/portfolio/{form.slug || '[slug]'}</code>. Client name, industry, services, timeline, year, and cover image are shared.
          </div>

          <Field label="العنوان (Title in Arabic)">
            <input dir="rtl" value={form.titleAr} onChange={(e) => set('titleAr', e.target.value)} className={`${inp()} text-right`} placeholder="عنوان دراسة الحالة..." />
          </Field>
          <Field label="النتيجة (Outcome in Arabic)">
            <input dir="rtl" value={form.outcomeAr} onChange={(e) => set('outcomeAr', e.target.value)} className={`${inp()} text-right`} placeholder="+38% تحويل" />
          </Field>
          <Field label="التحدي (Challenge in Arabic)">
            <textarea dir="rtl" value={form.challengeAr} onChange={(e) => set('challengeAr', e.target.value)} rows={4} className={`${inp()} text-right`} placeholder="صف التحدي بالعربية..." />
          </Field>
          <Field label="النهج (Approach in Arabic — one item per line)">
            <textarea dir="rtl" value={form.approachAr} onChange={(e) => set('approachAr', e.target.value)} rows={4} className={`${inp()} text-right`} placeholder="بند واحد في كل سطر..." />
          </Field>
          <Field label="الحل (Solution in Arabic — one item per line)">
            <textarea dir="rtl" value={form.solutionAr} onChange={(e) => set('solutionAr', e.target.value)} rows={4} className={`${inp()} text-right`} placeholder="بند واحد في كل سطر..." />
          </Field>
          <div>
            <label className="mb-2 block text-[13px] font-medium text-white/70">النتائج (Results in Arabic)</label>
            <div className="space-y-2">
              {form.resultsAr.map((r, i) => (
                <div key={i} className="flex gap-3">
                  <input dir="rtl" value={r.value} onChange={(e) => setResultAr(i, 'value', e.target.value)} placeholder="+38%" className={`${inp()} flex-1 text-right`} />
                  <input dir="rtl" value={r.label} onChange={(e) => setResultAr(i, 'label', e.target.value)} placeholder="تحويل" className={`${inp()} flex-1 text-right`} />
                </div>
              ))}
              <button type="button" onClick={() => set('resultsAr', [...form.resultsAr, { value: '', label: '' }])} className="text-[12px] text-teal hover:underline">
                + إضافة نتيجة
              </button>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 p-4">
            <p className="mb-3 text-[13px] font-medium text-white/70">شهادة بالعربية (Testimonial — optional)</p>
            <div className="space-y-3">
              <textarea dir="rtl" value={form.testimonialArQuote} onChange={(e) => set('testimonialArQuote', e.target.value)} rows={3} placeholder="الاقتباس بالعربية..." className={`${inp()} text-right`} />
              <div className="grid grid-cols-2 gap-3">
                <input dir="rtl" value={form.testimonialArAuthor} onChange={(e) => set('testimonialArAuthor', e.target.value)} placeholder="اسم الكاتب" className={`${inp()} text-right`} />
                <input dir="rtl" value={form.testimonialArRole} onChange={(e) => set('testimonialArRole', e.target.value)} placeholder="الدور" className={`${inp()} text-right`} />
              </div>
            </div>
          </div>
          <label className="flex items-center gap-2 text-[13px] text-white/70">
            <input type="checkbox" checked={form.publishedAr} onChange={(e) => set('publishedAr', e.target.checked)} className="accent-teal" />
            Published (Arabic) — منشور بالعربية
          </label>
        </>
      )}

      {submitError ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-[13px] text-red-400">
          {submitError}
        </p>
      ) : null}
      {Object.keys(errors).length > 0 ? (
        <p className="text-[13px] text-red-400">Please fill in all required fields before saving.</p>
      ) : null}

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={handleSave} disabled={saving} className="rounded-lg bg-teal px-5 py-2 text-[13px] font-semibold text-void disabled:opacity-50">
          {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create case study'}
        </button>
        {isEdit ? (
          <button type="button" onClick={handleDelete} className="rounded-lg border border-red-500/30 px-5 py-2 text-[13px] font-semibold text-red-400 hover:bg-red-500/10">
            Delete
          </button>
        ) : null}
        <button type="button" onClick={() => router.push('/admin/portfolio')} className="rounded-lg border border-white/10 px-5 py-2 text-[13px] text-white/50 hover:text-white">
          Cancel
        </button>
      </div>
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-white/70">{label}</label>
      {children}
      {error ? <p className="mt-1 text-[11px] text-red-400">{error}</p> : null}
    </div>
  )
}

function inp(error?: string) {
  return [
    'w-full rounded-lg border bg-white/5 px-3 py-2 text-[13px] text-white placeholder-white/30 outline-none',
    error
      ? 'border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
      : 'border-white/10 focus:border-teal/50 focus:ring-1 focus:ring-teal/30',
  ].join(' ')
}
