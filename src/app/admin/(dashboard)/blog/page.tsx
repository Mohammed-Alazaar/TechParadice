export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import dbConnect from '@/lib/mongodb'
import BlogPostModel from '@/lib/models/BlogPost'

export default async function AdminBlogPage() {
  await dbConnect()
  const posts = await BlogPostModel.find({}).sort({ date: -1 }).lean()

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Blog Posts</h1>
          <p className="mt-1 text-[14px] text-white/40">{posts.length} posts</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2 text-[13px] font-semibold text-void hover:opacity-90"
        >
          <Plus size={15} />
          New Post
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-4 py-3 text-left font-medium text-white/50">Title</th>
              <th className="px-4 py-3 text-left font-medium text-white/50">Category</th>
              <th className="px-4 py-3 text-left font-medium text-white/50">Date</th>
              <th className="px-4 py-3 text-left font-medium text-white/50">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.slug} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-medium text-white">{post.title}</td>
                <td className="px-4 py-3 text-white/50">{post.category}</td>
                <td className="px-4 py-3 text-white/50">{post.date}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      post.published
                        ? 'bg-teal/20 text-teal'
                        : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/blog/${post.slug}`}
                    className="text-white/40 hover:text-teal"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-white/30">
                  No posts yet.{' '}
                  <Link href="/admin/blog/new" className="text-teal hover:underline">
                    Create the first one.
                  </Link>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}
