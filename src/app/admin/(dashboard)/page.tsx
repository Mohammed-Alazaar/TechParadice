export const dynamic = 'force-dynamic'

import dbConnect from '@/lib/mongodb'
import BlogPostModel from '@/lib/models/BlogPost'
import CaseStudyModel from '@/lib/models/CaseStudy'
import ServiceModel from '@/lib/models/Service'
import InquiryModel from '@/lib/models/Inquiry'

async function getStats() {
  await dbConnect()
  const [posts, studies, services, inquiries, newInquiries] = await Promise.all([
    BlogPostModel.countDocuments(),
    CaseStudyModel.countDocuments(),
    ServiceModel.countDocuments(),
    InquiryModel.countDocuments(),
    InquiryModel.countDocuments({ status: 'new' }),
  ])
  return { posts, studies, services, inquiries, newInquiries }
}

export default async function AdminDashboard() {
  const stats = await getStats()

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
