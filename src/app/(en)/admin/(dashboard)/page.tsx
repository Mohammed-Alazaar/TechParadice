export const dynamic = 'force-dynamic'

import dbConnect from '@/lib/mongodb'
import BlogPostModel from '@/lib/models/BlogPost'
import CaseStudyModel from '@/lib/models/CaseStudy'
import ServiceModel from '@/lib/models/Service'
import InquiryModel from '@/lib/models/Inquiry'

type Stats = {
  posts: number
  studies: number
  services: number
  inquiries: number
  newInquiries: number
}

async function getStats(): Promise<{ stats: Stats; error: string | null }> {
  try {
    await dbConnect()
    const [posts, studies, services, inquiries, newInquiries] = await Promise.all([
      BlogPostModel.countDocuments(),
      CaseStudyModel.countDocuments(),
      ServiceModel.countDocuments(),
      InquiryModel.countDocuments(),
      InquiryModel.countDocuments({ status: 'new' }),
    ])
    return { stats: { posts, studies, services, inquiries, newInquiries }, error: null }
  } catch (err) {
    console.error('[admin/dashboard] failed to load stats', err)
    const message = err instanceof Error ? err.message : 'Unknown database error'
    return {
      stats: { posts: 0, studies: 0, services: 0, inquiries: 0, newInquiries: 0 },
      error: message,
    }
  }
}

export default async function AdminDashboard() {
  const { stats, error } = await getStats()

  const cards = [
    { label: 'Blog Posts', value: stats.posts, href: '/admin/blog' },
    { label: 'Case Studies', value: stats.studies, href: '/admin/portfolio' },
    { label: 'Services', value: stats.services, href: '/admin/services' },
    {
      label: 'Inquiries',
      value: stats.inquiries,
      badge: stats.newInquiries > 0 ? `${stats.newInquiries} new` : undefined,
      href: '/admin/inquiries',
    },
  ]

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white">Dashboard</h1>
      <p className="mt-1 text-[14px] text-white/40">Overview of your site content</p>

      {error ? (
        <div className="mt-6 rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4 text-[13px] text-yellow-200/80">
          <p className="font-semibold text-yellow-200">Database unavailable</p>
          <p className="mt-1 text-yellow-200/70">
            Couldn&apos;t load content counts: {error}. Set <code>MONGODB_URI</code> in your environment to connect.
          </p>
        </div>
      ) : null}

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            className="rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-teal/30"
          >
            <p className="text-[13px] text-white/40">{card.label}</p>
            <p className="mt-2 font-display text-3xl font-bold text-white">{card.value}</p>
            {card.badge ? (
              <span className="mt-2 inline-block rounded-full bg-teal/20 px-2 py-0.5 text-[11px] font-semibold text-teal">
                {card.badge}
              </span>
            ) : null}
          </a>
        ))}
      </div>
    </div>
  )
}
