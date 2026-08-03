'use client'

import { useRouter } from 'next/navigation'

interface Props {
  id: string
  status: string
}

export function InquiryActions({ id, status }: Props) {
  const router = useRouter()

  async function setStatus(newStatus: string) {
    await fetch(`/api/admin/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    router.refresh()
  }

  async function handleDelete() {
    if (!confirm('Delete this inquiry?')) return
    await fetch(`/api/admin/inquiries/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <div className="flex shrink-0 flex-col gap-2">
      {status !== 'read' && (
        <button
          onClick={() => setStatus('read')}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-[12px] text-white/50 hover:text-white"
        >
          Mark read
        </button>
      )}
      {status !== 'replied' && (
        <button
          onClick={() => setStatus('replied')}
          className="rounded-lg border border-green-500/30 px-3 py-1.5 text-[12px] text-green-400 hover:bg-green-500/10"
        >
          Mark replied
        </button>
      )}
      <button
        onClick={handleDelete}
        className="rounded-lg border border-red-500/20 px-3 py-1.5 text-[12px] text-red-400/60 hover:border-red-500/40 hover:text-red-400"
      >
        Delete
      </button>
    </div>
  )
}
