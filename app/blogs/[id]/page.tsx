export const instant = false

import { addLike } from "@/app/actions/blogs"
import { getBlogById } from "@/app/services/blogs"
import { notFound } from "next/navigation"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    return notFound()
  }

  return (
    <div>
      <h2> {blog.title} </h2>
      <p> Written by {blog.author} </p>
      <p> {blog.likes} likes </p>
      <p> <a href={blog.url}> Link </a></p>
      <form action={addLike}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit"> Like </button>
      </form>
    </div>
  )
}

export default BlogPage
