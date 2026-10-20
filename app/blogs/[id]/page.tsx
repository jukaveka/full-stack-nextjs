import { getBlogById } from "@/app/services/blogs"
import { notFound } from "next/navigation"

export const instant = false

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
    </div>
  )
}

export default BlogPage
