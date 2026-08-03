'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ICON_MAP } from '@/lib/services'

interface ServiceFormProps {
  initialData: {
    slug: string
    name: string
    short: string
    value: string
    iconName: string
    deliverables: string[]
    process: { step: string; detail: string }[]
    tools: string[]
    faqs: { q: string; a: string }[]
    pairsWith: string[]
    order: number
    nameAr?: string
    shortAr?: string
    valueAr?: string
    deliverablesAr?: string[]
    processAr?: { step: string; detail: string }[]
    faqsAr?: { q: string; a: string }[]
  }
}

function processToText(items: { step: string; detail: string }[] | undefined) {
  return (items ?? []).map((p) => `${p.step} | ${p.detail}`).join('\n')
}

function faqsToText(items: { q: string; a: string }[] | undefined) {
  return (items ?? []).map((f) => `${f.q} | ${f.a}`).join('\n')
}

function textToProcess(text: string): { step: string; detail: string }[] {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const idx = l.indexOf('|')
      if (idx === -1) return { step: l, detail: '' }
      return { step: l.slice(0, idx).trim(), detail: l.slice(idx + 1).trim() }
    })
}

function textToFaqs(text: string): { q: string; a: string }[] {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const idx = l.indexOf('|')
      if (idx === -1) return { q: l, a: '' }
      return { q: l.slice(0, idx).trim(), a: l.slice(idx + 1).trim() }
    })
}

export function ServiceForm({ initialData }: ServiceFormProps) {
  const router = useRouter()
  const [tab, setTab] = useState<'en' | 'ar'>('en')

  const [form, setForm] = useState({
    name: initialData.name,
    short: initialData.short,
    value: initialData.value,
    iconName: initialData.iconName,
    deliverables: initialData.deliverables.join('\n'),
    tools: initialData.tools.join(', '),
    pairsWith: initialData.pairsWith.join(', '),
    order: initialData.order,
    nameAr: initialData.nameAr ?? '',
    shortAr: initialData.shortAr ?? '',
    valueAr: initialData.valueAr ?? '',
    deliverablesAr: initialData.deliverablesAr?.join('\n') ?? '',
    processAr: processToText(initialData.processAr),
    faqsAr: faqsToText(initialData.faqsAr),
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
      name: form.name,
      short: form.short,
      value: form.value,
      iconName: form.iconName,
      deliverables: form.deliverables.split('\n').map((s) => s.trim()).filter(Boolean),
      tools: form.tools.split(',').map((s) => s.trim()).filter(Boolean),
      pairsWith: form.pairsWith.split(',').map((s) => s.trim()).filter(Boolean),
      order: Number(form.order),
      nameAr: form.nameAr || undefined,
      shortAr: form.shortAr || undefined,
      valueAr: form.valueAr || undefined,
      deliverablesAr: form.deliverablesAr
        ? form.deliverablesAr.split('\n').map((s) => s.trim()).filter(Boolean)
        : [],
      processAr: form.processAr ? textToProcess(form.processAr) : [],
      faqsAr: form.faqsAr ? textToFaqs(form.faqsAr) : [],
    }

    const res = await fetch(`/api/admin/services/${initialData.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      router.push('/admin/services')
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.error ?? 'Failed to save')
      setSaving(false)
    }
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
            <Field label="Name"><input value={form.name} onChange={(e) => set('name', e.target.value)} className={inp} /></Field>
            <Field label="Icon">
              <select value={form.iconName} onChange={(e) => set('iconName', e.target.value)} className={inp}>
                {Object.keys(ICON_MAP).map((k) => <option key={k}>{k}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Short description"><input value={form.short} onChange={(e) => set('short', e.target.value)} className={inp} /></Field>
          <Field label="Value proposition"><textarea value={form.value} onChange={(e) => set('value', e.target.value)} rows={3} className={inp} /></Field>
          <Field label="Deliverables (one per line)"><textarea value={form.deliverables} onChange={(e) => set('deliverables', e.target.value)} rows={6} className={inp} /></Field>
          <Field label="Tools (comma-separated)"><input value={form.tools} onChange={(e) => set('tools', e.target.value)} className={inp} /></Field>
          <Field label="Pairs with (comma-separated slugs)"><input value={form.pairsWith} onChange={(e) => set('pairsWith', e.target.value)} className={inp} /></Field>
          <Field label="Order">
            <input type="number" value={form.order} onChange={(e) => set('order', e.target.value)} className={`${inp} w-24`} />
          </Field>
        </>
      ) : (
        <>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-[12px] text-amber-400">
            Arabic content is served at <code dir="ltr">/ar/services/{initialData.slug}</code>. Icon and tools are shared.
            <br />
            For process steps and FAQs, use format: <code dir="ltr">Title | Detail</code> (one per line).
          </div>

          <Field label="الاسم (Name in Arabic)">
            <input dir="rtl" value={form.nameAr} onChange={(e) => set('nameAr', e.target.value)} className={`${inp} text-right`} placeholder="اسم الخدمة بالعربية..." />
          </Field>

          <Field label="وصف قصير (Short description in Arabic)">
            <input dir="rtl" value={form.shortAr} onChange={(e) => set('shortAr', e.target.value)} className={`${inp} text-right`} placeholder="وصف قصير بالعربية..." />
          </Field>

          <Field label="مقترح القيمة (Value proposition in Arabic)">
            <textarea dir="rtl" value={form.valueAr} onChange={(e) => set('valueAr', e.target.value)} rows={3} className={`${inp} text-right`} placeholder="مقترح القيمة بالعربية..." />
          </Field>

          <Field label="المخرجات (Deliverables — one per line)">
            <textarea dir="rtl" value={form.deliverablesAr} onChange={(e) => set('deliverablesAr', e.target.value)} rows={6} className={`${inp} text-right`} placeholder="بند واحد في كل سطر..." />
          </Field>

          <Field label="خطوات العملية (Process steps — &quot;الاسم | التفاصيل&quot; per line)">
            <textarea
              dir="rtl"
              value={form.processAr}
              onChange={(e) => set('processAr', e.target.value)}
              rows={5}
              className={`${inp} text-right`}
              placeholder={'الاكتشاف | مقابلات أصحاب المصلحة ومراجعة الأهداف\nالتصميم | نماذج أولية في Figma'}
            />
          </Field>

          <Field label="الأسئلة الشائعة (FAQs — &quot;السؤال | الجواب&quot; per line)">
            <textarea
              dir="rtl"
              value={form.faqsAr}
              onChange={(e) => set('faqsAr', e.target.value)}
              rows={5}
              className={`${inp} text-right`}
              placeholder={'ما المدة المعتادة؟ | تتراوح عادةً بين 4 و8 أسابيع\nكيف تُصدرون الفواتير؟ | على أساس المراحل'}
            />
          </Field>
        </>
      )}

      {error ? <p className="text-[13px] text-red-400">{error}</p> : null}

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={handleSave} disabled={saving} className="rounded-lg bg-teal px-5 py-2 text-[13px] font-semibold text-void disabled:opacity-50">
          {saving ? 'Saving…' : 'Save changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/services')} className="rounded-lg border border-white/10 px-5 py-2 text-[13px] text-white/50 hover:text-white">
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
