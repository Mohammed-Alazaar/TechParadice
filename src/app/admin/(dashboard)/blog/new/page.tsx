import { BlogForm } from '../BlogForm'

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white">New Blog Post</h1>
      <div className="mt-6">
        <BlogForm />
      </div>
    </div>
  )
}
