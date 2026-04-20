export const dynamic = 'force-dynamic'

import Link from 'next/link'
import dbConnect from '@/lib/mongodb'
import ServiceModel from '@/lib/models/Service'

export default async function AdminServicesPage() {
  await dbConnect()
  const services = await ServiceModel.find({}).sort({ order: 1 }).lean()

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Services</h1>
          <p className="mt-1 text-[14px] text-white/40">{services.length} services</p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-4 py-3 text-left font-medium text-white/50">Order</th>
              <th className="px-4 py-3 text-left font-medium text-white/50">Name</th>
              <th className="px-4 py-3 text-left font-medium text-white/50">Slug</th>
              <th className="px-4 py-3 text-left font-medium text-white/50">Icon</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.slug} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="px-4 py-3 text-white/50">{s.order}</td>
                <td className="px-4 py-3 font-medium text-white">{s.name}</td>
                <td className="px-4 py-3 font-mono text-white/40">{s.slug}</td>
                <td className="px-4 py-3 text-white/50">{s.iconName}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/services/${s.slug}`} className="text-white/40 hover:text-teal">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {services.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-white/30">
                  No services. Run the seed script to populate initial data.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}
