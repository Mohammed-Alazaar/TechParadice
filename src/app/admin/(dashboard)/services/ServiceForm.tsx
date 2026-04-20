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
  }
}

export function ServiceForm({ initialData }: ServiceFormProps) {
  const router = useRouter()

  const [form, setForm] = useState({
    name: initialData.name,
    short: initialData.short,
    value: initialData.value,
    iconName: initialData.iconName,
    deliverables: initialData.deliverables.join('\n'),
    tools: initialData.tools.join(', '),
    pairsWith: initialData.pairsWith.join(', '),
    order: initialData.order,
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
