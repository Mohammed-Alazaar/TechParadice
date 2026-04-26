'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { RichTextEditor } from '@/components/admin/RichTextEditor'

const CATEGORIES = ['Web', 'Design', 'Growth', 'Engineering'] as const

interface BlogFormProps {
  initialData?: {
    slug: string
    title: string
    excerpt: string
    category: string
    author: string
    date: string
    readingTime: string
    body: string[]
    cover?: string
    published: boolean
    titleAr?: string
    excerptAr?: string
    bodyAr?: string[]
    publishedAr?: boolean
  }
}

function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function toEditorContent(body: string[] | undefined): string {
  if (!body || body.length === 0) return ''
  if (body.length === 1 && /<[a-z][\s\S]*>/i.test(body[0])) return body[0]
  return body.map((p) => `<p>${p}</p>`).join('')
}

const REQUIRED = ['slug', 'title', 'excerpt', 'author', 'date', 'readingTime'] as const

export function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter()
  const isEdit = Boolean(initialData?.slug)
  const [tab, setTab] = useState<'en' | 'ar'>('en')

  const [form, setForm] = useState({
    slug: initialData?.slug ?? '',
    title: initialData?.title ?? '',
    excerpt: initialData?.excerpt ?? '',
    category: initialData?.category ?? 'Web',
    author: initialData?.author ?? 'Mohammed',
    date: initialData?.date ?? new Date().toISOString().split('T')[0],
    readingTime: initialData?.readingTime ?? '5 min',
    body: toEditorContent(initialData?.body),
    cover: initialData?.cover ?? '',
    published: initialData?.published ?? true,
    titleAr: initialData?.titleAr ?? '',
    excerptAr: initialData?.excerptAr ?? '',
    bodyAr: toEditorContent(initialData?.bodyAr),
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

  function validate() {
    const next: Record<string, string> = {}
    for (const field of REQUIRED) {
      const val = form[field]
      if (!val.trim()) next[field] = 'This field is required'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSave() {
    if (!validate()) return
    setSaving(true)
    setSubmitError('')

    const payload = {
      ...form,
      body: form.body ? [form.body] : [],
      bodyAr: form.bodyAr ? [form.bodyAr] : [],
    }

    const url = isEdit ? `/api/admin/blog/${initialData!.slug}` : '/api/admin/blog'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      router.push('/admin/blog')
      router.refresh()
    } else {
      const data = await res.json()
      setSubmitError(data.error ?? 'Failed to save')
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this post?')) return
    await fetch(`/api/admin/blog/${initialData!.slug}`, { method: 'DELETE' })
    router.push('/admin/blog')
    router.refresh()
  }

  return (
    <div className="max-w-3xl space-y-5">
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
          <Field label="Title" error={errors.title}>
            <input value={form.title} onChange={(e) => set('title', e.target.value)} className={inp(errors.title)} />
          </Field>

          <Field label="Slug" error={errors.slug}>
            <input value={form.slug} onChange={(e) => set('slug', e.target.value)} className={inp(errors.slug)} />
          </Field>

          <Field label="Excerpt" error={errors.excerpt}>
            <textarea value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} rows={3} className={inp(errors.excerpt)} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select value={form.category} onChange={(e) => set('category', e.target.value)} className={inp()}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Author" error={errors.author}>
              <input value={form.author} onChange={(e) => set('author', e.target.value)} className={inp(errors.author)} />
            </Field>
            <Field label="Date" error={errors.date}>
              <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} className={inp(errors.date)} />
            </Field>
            <Field label="Reading time" error={errors.readingTime}>
              <input value={form.readingTime} onChange={(e) => set('readingTime', e.target.value)} className={inp(errors.readingTime)} placeholder="5 min" />
            </Field>
          </div>

          <Field label="Body">
            <RichTextEditor
              value={form.body}
              onChange={(html) => set('body', html)}
              dir="ltr"
              placeholder="Write your post here…"
            />
          </Field>

          <ImageUpload value={form.cover} onChange={(url) => set('cover', url)} />

          <label className="flex items-center gap-2 text-[13px] text-white/70">
            <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} className="accent-teal" />
            Published (English)
          </label>
        </>
      ) : (
        <>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-[12px] text-amber-400">
            Arabic content served at <code dir="ltr">/ar/blog/{form.slug || '[slug]'}</code>. Cover image is shared.
          </div>

          <Field label="عنوان المقال (Title in Arabic)">
            <input
              dir="rtl"
              value={form.titleAr}
              onChange={(e) => set('titleAr', e.target.value)}
              className={`${inp()} text-right`}
              placeholder="اكتب العنوان بالعربية..."
            />
          </Field>

          <Field label="مقتطف (Excerpt in Arabic)">
            <textarea
              dir="rtl"
              value={form.excerptAr}
              onChange={(e) => set('excerptAr', e.target.value)}
              rows={3}
              className={`${inp()} text-right`}
              placeholder="اكتب المقتطف بالعربية..."
            />
          </Field>

          <Field label="المحتوى (Body in Arabic)">
            <RichTextEditor
              value={form.bodyAr}
              onChange={(html) => set('bodyAr', html)}
              dir="rtl"
              placeholder="اكتب محتوى المقال بالعربية..."
            />
          </Field>

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
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-teal px-5 py-2 text-[13px] font-semibold text-void disabled:opacity-50"
        >
          {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create post'}
        </button>
        {isEdit ? (
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg border border-red-500/30 px-5 py-2 text-[13px] font-semibold text-red-400 hover:bg-red-500/10"
          >
            Delete
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => router.push('/admin/blog')}
          className="rounded-lg border border-white/10 px-5 py-2 text-[13px] text-white/50 hover:text-white"
        >
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
