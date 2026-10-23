export const instant = false

import { addLike } from "@/app/actions/blogs"
import { getBlogById } from "@/app/services/blogs"
import { notFound } from "next/navigation"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    return notFound()
  }

  return (
    <div>
      <p className="text-3xl px-10 py-5"> Blog information </p>
      <p className="text-xl px-10 py-2 font-bold"> {blog.title} </p>
      <p className="px-10 py-2"> Written by <a className="font-bold">{blog.author}</a> </p>
      <p className="px-10 py-2"> <a href={blog.url} className="underline text-blue-500"> Link </a></p>
      <p className="text-lg px-10 py-2"> {blog.likes} likes </p>
      <form action={addLike} className="px-10 py-2">
        <input type="hidden" name="id" value={blog.id} />
        <button
          type="submit"
          className="bg-slate-700 px-5 py-3 text-white rounded font-bold"
        >
          Like
        </button>
      </form>
    </div>
  )
}

export default BlogPage
