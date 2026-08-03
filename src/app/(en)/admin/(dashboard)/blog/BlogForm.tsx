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
    coverAr?: string
    publishedAr?: boolean
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: string[]
    metaTitleAr?: string
    metaDescriptionAr?: string
    metaKeywordsAr?: string[]
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

/** "a, b ,c" <-> ["a","b","c"] for the comma-separated keyword inputs */
function splitKeywords(value: string): string[] {
  return value.split(',').map((k) => k.trim()).filter(Boolean)
}

/** SERP-length hint under a meta title/description field */
function CharCount({ value, max }: { value: string; max: number }) {
  return (
    <p className={`mt-1 text-[11px] ${value.length > max ? 'text-amber-400' : 'text-white/30'}`}>
      {value.length}/{max} recommended
    </p>
  )
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
    coverAr: initialData?.coverAr ?? '',
    publishedAr: initialData?.publishedAr ?? false,
    metaTitle: initialData?.metaTitle ?? '',
    metaDescription: initialData?.metaDescription ?? '',
    metaKeywords: (initialData?.metaKeywords ?? []).join(', '),
    metaTitleAr: initialData?.metaTitleAr ?? '',
    metaDescriptionAr: initialData?.metaDescriptionAr ?? '',
    metaKeywordsAr: (initialData?.metaKeywordsAr ?? []).join(', '),
  })

  // When no Arabic-specific cover is stored, default to reusing the English one.
  const [useSameCover, setUseSameCover] = useState(!initialData?.coverAr)

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
      // Empty coverAr => Arabic pages fall back to the English cover.
      coverAr: useSameCover ? '' : form.coverAr,
      // Comma-separated inputs -> string arrays for the schema.
      metaKeywords: splitKeywords(form.metaKeywords),
      metaKeywordsAr: splitKeywords(form.metaKeywordsAr),
      // Trim so a whitespace-only entry collapses to '' and the ||-fallback engages.
      metaTitle: form.metaTitle.trim(),
      metaDescription: form.metaDescription.trim(),
      metaTitleAr: form.metaTitleAr.trim(),
      metaDescriptionAr: form.metaDescriptionAr.trim(),
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

          <div className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-[13px] font-semibold text-white/80">SEO / Meta (English)</p>
            <Field label="Meta title">
              <input
                value={form.metaTitle}
                onChange={(e) => set('metaTitle', e.target.value)}
                className={inp()}
                placeholder="Falls back to the post title if left empty"
              />
              <CharCount value={form.metaTitle} max={60} />
            </Field>
            <Field label="Meta description">
              <textarea
                value={form.metaDescription}
                onChange={(e) => set('metaDescription', e.target.value)}
                rows={3}
                className={inp()}
                placeholder="Falls back to the excerpt if left empty"
              />
              <CharCount value={form.metaDescription} max={160} />
            </Field>
            <Field label="Meta keywords (comma-separated)">
              <input
                value={form.metaKeywords}
                onChange={(e) => set('metaKeywords', e.target.value)}
                className={inp()}
                placeholder="web design, seo, growth"
              />
              <p className="mt-1 text-[11px] text-white/30">Stored as a keywords meta tag. Note: major search engines give it little weight.</p>
            </Field>
          </div>

          <label className="flex items-center gap-2 text-[13px] text-white/70">
            <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} className="accent-teal" />
            Published (English)
          </label>
        </>
      ) : (
        <>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-[12px] text-amber-400">
            Arabic content served at <code dir="ltr">/ar/blog/{form.slug || '[slug]'}</code>.
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

          <div className="space-y-3 rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-[13px] font-medium text-white/70">صورة الغلاف للنسخة العربية (Arabic cover image)</p>

            <label className="flex items-center gap-2 text-[13px] text-white/70">
              <input
                type="checkbox"
                checked={useSameCover}
                onChange={(e) => setUseSameCover(e.target.checked)}
                className="accent-teal"
              />
              استخدام نفس صورة النسخة الإنجليزية (Use the same image as English)
            </label>

            {useSameCover ? (
              form.cover ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.cover} alt="English cover" className="h-full w-full object-cover" />
                  <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-[11px] text-white/80">
                    English cover
                  </span>
                </div>
              ) : (
                <p className="text-[12px] text-white/40">
                  No English cover uploaded yet — add one on the English tab, or uncheck this box to upload an Arabic-only image.
                </p>
              )
            ) : (
              <>
                <ImageUpload
                  label="صورة عربية (Arabic cover)"
                  value={form.coverAr}
                  onChange={(url) => set('coverAr', url)}
                />
                {!form.coverAr ? (
                  <p className="text-[12px] text-white/40">
                    لم تُضف صورة عربية بعد — ستُستخدم صورة النسخة الإنجليزية حتى ترفع واحدة. (No Arabic image yet — the English cover is used until you upload one.)
                  </p>
                ) : null}
              </>
            )}
          </div>

          <div className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-[13px] font-semibold text-white/80">SEO / Meta (العربية)</p>
            <Field label="عنوان الميتا (Meta title)">
              <input
                dir="rtl"
                value={form.metaTitleAr}
                onChange={(e) => set('metaTitleAr', e.target.value)}
                className={`${inp()} text-right`}
                placeholder="يُستخدم عنوان المقال إذا تُرك فارغًا"
              />
              <CharCount value={form.metaTitleAr} max={60} />
            </Field>
            <Field label="وصف الميتا (Meta description)">
              <textarea
                dir="rtl"
                value={form.metaDescriptionAr}
                onChange={(e) => set('metaDescriptionAr', e.target.value)}
                rows={3}
                className={`${inp()} text-right`}
                placeholder="يُستخدم المقتطف إذا تُرك فارغًا"
              />
              <CharCount value={form.metaDescriptionAr} max={160} />
            </Field>
            <Field label="الكلمات المفتاحية (مفصولة بفواصل)">
              <input
                dir="rtl"
                value={form.metaKeywordsAr}
                onChange={(e) => set('metaKeywordsAr', e.target.value)}
                className={`${inp()} text-right`}
                placeholder="السيو, تصميم المواقع, النمو"
              />
            </Field>
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
