'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ImageUpload } from '@/components/admin/ImageUpload'

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
  }
}

export function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter()
  const isEdit = Boolean(initialData?.slug)

  const [form, setForm] = useState({
    slug: initialData?.slug ?? '',
    title: initialData?.title ?? '',
    excerpt: initialData?.excerpt ?? '',
    category: initialData?.category ?? 'Web',
    author: initialData?.author ?? 'Mohammed',
    date: initialData?.date ?? new Date().toISOString().split('T')[0],
    readingTime: initialData?.readingTime ?? '5 min',
    body: initialData?.body?.join('\n\n') ?? '',
    cover: initialData?.cover ?? '',
    published: initialData?.published ?? true,
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set(key: string, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    const payload = {
      ...form,
      body: form.body.split('\n\n').map((p) => p.trim()).filter(Boolean),
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
      setError(data.error ?? 'Failed to save')
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
    <div className="max-w-2xl space-y-5">
      <Field label="Title">
        <input value={form.title} onChange={(e) => set('title', e.target.value)} className={input} />
      </Field>

      <Field label="Slug">
        <input value={form.slug} onChange={(e) => set('slug', e.target.value)} className={input} />
      </Field>

      <Field label="Excerpt">
        <textarea
          value={form.excerpt}
          onChange={(e) => set('excerpt', e.target.value)}
          rows={3}
          className={input}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Category">
          <select value={form.category} onChange={(e) => set('category', e.target.value)} className={input}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Author">
          <input value={form.author} onChange={(e) => set('author', e.target.value)} className={input} />
        </Field>
        <Field label="Date">
          <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} className={input} />
        </Field>
        <Field label="Reading time">
          <input value={form.readingTime} onChange={(e) => set('readingTime', e.target.value)} className={input} placeholder="5 min" />
        </Field>
      </div>

      <Field label="Body (separate paragraphs with a blank line)">
        <textarea
          value={form.body}
          onChange={(e) => set('body', e.target.value)}
          rows={12}
          className={input}
        />
      </Field>

      <ImageUpload value={form.cover} onChange={(url) => set('cover', url)} />

      <label className="flex items-center gap-2 text-[13px] text-white/70">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => set('published', e.target.checked)}
          className="accent-teal"
        />
        Published
      </label>

      {error ? <p className="text-[13px] text-red-400">{error}</p> : null}

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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-white/70">{label}</label>
      {children}
    </div>
  )
}

const input =
  'w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-white placeholder-white/30 outline-none focus:border-teal/50 focus:ring-1 focus:ring-teal/30'
