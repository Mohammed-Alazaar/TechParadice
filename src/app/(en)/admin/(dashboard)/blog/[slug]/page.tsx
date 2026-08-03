import { notFound } from 'next/navigation'
import dbConnect from '@/lib/mongodb'
import BlogPostModel from '@/lib/models/BlogPost'
import { BlogForm } from '../BlogForm'

type Params = { params: { slug: string } }

export default async function EditBlogPostPage({ params }: Params) {
  await dbConnect()
  const post = await BlogPostModel.findOne({ slug: params.slug }).lean()
  if (!post) notFound()

  const serialized = JSON.parse(JSON.stringify(post))

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white">Edit Post</h1>
      <div className="mt-6">
        <BlogForm initialData={serialized} />
      </div>
    </div>
  )
}
