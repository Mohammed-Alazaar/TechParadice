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
  }
}

export function PortfolioForm({ initialData }: PortfolioFormProps) {
  const router = useRouter()
  const isEdit = Boolean(initialData?.slug)

  const [form, setForm] = useState({
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
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set(key: string, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function setResult(i: number, key: 'value' | 'label', val: string) {
    setForm((f) => {
      const results = [...f.results]
      results[i] = { ...results[i], [key]: val }
      return { ...f, results }
    })
  }

  async function handleSave() {
    setSaving(true)
    setError('')

    const payload = {
      slug: form.slug,
      client: form.client,
      title: form.title,
      industry: form.industry,
      services: form.services.split(',').map((s) => s.trim()).filter(Boolean),
      timeline: form.timeline,
      year: form.year,
      outcome: form.outcome,
      cover: form.cover,
      challenge: form.challenge,
      approach: form.approach.split('\n').map((s) => s.trim()).filter(Boolean),
      solution: form.solution.split('\n').map((s) => s.trim()).filter(Boolean),
      results: form.results.filter((r) => r.value && r.label),
      testimonial:
        form.testimonialQuote
          ? { quote: form.testimonialQuote, author: form.testimonialAuthor, role: form.testimonialRole }
          : undefined,
      published: form.published,
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
      setError(data.error ?? 'Failed to save')
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
      <div className="grid grid-cols-2 gap-4">
        <Field label="Client"><input value={form.client} onChange={(e) => set('client', e.target.value)} className={inp} /></Field>
        <Field label="Slug"><input value={form.slug} onChange={(e) => set('slug', e.target.value)} className={inp} /></Field>
      </div>

      <Field label="Title"><input value={form.title} onChange={(e) => set('title', e.target.value)} className={inp} /></Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Industry"><input value={form.industry} onChange={(e) => set('industry', e.target.value)} className={inp} /></Field>
        <Field label="Outcome (e.g. +38% conversion)"><input value={form.outcome} onChange={(e) => set('outcome', e.target.value)} className={inp} /></Field>
        <Field label="Timeline (e.g. 12 weeks)"><input value={form.timeline} onChange={(e) => set('timeline', e.target.value)} className={inp} /></Field>
        <Field label="Year"><input value={form.year} onChange={(e) => set('year', e.target.value)} className={inp} /></Field>
      </div>

      <Field label="Services (comma-separated)">
        <input value={form.services} onChange={(e) => set('services', e.target.value)} className={inp} placeholder="Web Development, UI/UX Design" />
      </Field>

      <Field label="Challenge"><textarea value={form.challenge} onChange={(e) => set('challenge', e.target.value)} rows={4} className={inp} /></Field>
      <Field label="Approach (one item per line)"><textarea value={form.approach} onChange={(e) => set('approach', e.target.value)} rows={4} className={inp} /></Field>
      <Field label="Solution (one item per line)"><textarea value={form.solution} onChange={(e) => set('solution', e.target.value)} rows={4} className={inp} /></Field>

      <div>
        <label className="mb-2 block text-[13px] font-medium text-white/70">Results</label>
        <div className="space-y-2">
          {form.results.map((r, i) => (
            <div key={i} className="flex gap-3">
              <input value={r.value} onChange={(e) => setResult(i, 'value', e.target.value)} placeholder="Value (e.g. +38%)" className={`${inp} flex-1`} />
              <input value={r.label} onChange={(e) => setResult(i, 'label', e.target.value)} placeholder="Label (e.g. conversion)" className={`${inp} flex-1`} />
            </div>
          ))}
          <button
            type="button"
            onClick={() => set('results', [...form.results, { value: '', label: '' }])}
            className="text-[12px] text-teal hover:underline"
          >
            + Add result
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 p-4">
        <p className="mb-3 text-[13px] font-medium text-white/70">Testimonial (optional)</p>
        <div className="space-y-3">
          <textarea value={form.testimonialQuote} onChange={(e) => set('testimonialQuote', e.target.value)} rows={3} placeholder="Quote" className={inp} />
          <div className="grid grid-cols-2 gap-3">
            <input value={form.testimonialAuthor} onChange={(e) => set('testimonialAuthor', e.target.value)} placeholder="Author name" className={inp} />
            <input value={form.testimonialRole} onChange={(e) => set('testimonialRole', e.target.value)} placeholder="Role" className={inp} />
          </div>
        </div>
      </div>

      <ImageUpload value={form.cover} onChange={(url) => set('cover', url)} />

      <label className="flex items-center gap-2 text-[13px] text-white/70">
        <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} className="accent-teal" />
        Published
      </label>

      {error ? <p className="text-[13px] text-red-400">{error}</p> : null}

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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-white/70">{label}</label>
      {children}
    </div>
  )
}

const inp = 'w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-white placeholder-white/30 outline-none focus:border-teal/50 focus:ring-1 focus:ring-teal/30'
