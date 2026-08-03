export const dynamic = 'force-dynamic'

import dbConnect from '@/lib/mongodb'
import InquiryModel from '@/lib/models/Inquiry'
import { InquiryActions } from './InquiryActions'

export default async function AdminInquiriesPage() {
  await dbConnect()
  const inquiries = await InquiryModel.find({}).sort({ createdAt: -1 }).lean<Array<Record<string, any>>>()

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Inquiries</h1>
        <p className="mt-1 text-[14px] text-white/40">{inquiries.length} total</p>
      </div>

      <div className="mt-6 space-y-3">
        {inquiries.map((inq) => (
          <div
            key={inq._id.toString()}
            className="rounded-xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase ${
                      inq.type === 'quote' ? 'bg-teal/20 text-teal' : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {inq.type}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      inq.status === 'new'
                        ? 'bg-amber-500/20 text-amber-400'
                        : inq.status === 'replied'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {inq.status}
                  </span>
                  <span className="text-[12px] text-white/30">
                    {new Date((inq as any).createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 font-medium text-white">
                  {inq.name}
                  {inq.company ? <span className="text-white/50"> @ {inq.company}</span> : null}
                </p>
                <a
                  href={`mailto:${inq.email}`}
                  className="text-[13px] text-teal hover:underline"
                >
                  {inq.email}
                </a>
                {inq.budget ? (
                  <p className="mt-1 text-[13px] text-white/50">Budget: {inq.budget}</p>
                ) : null}
                {inq.services?.length ? (
                  <p className="mt-1 text-[13px] text-white/50">Services: {inq.services.join(', ')}</p>
                ) : null}
                <p className="mt-3 text-[14px] text-white/70 line-clamp-3">{inq.message}</p>
              </div>
              <InquiryActions id={inq._id.toString()} status={inq.status} />
            </div>
          </div>
        ))}
        {inquiries.length === 0 ? (
          <p className="py-12 text-center text-[14px] text-white/30">No inquiries yet.</p>
        ) : null}
      </div>
    </div>
  )
}
