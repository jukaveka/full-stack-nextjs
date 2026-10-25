import { addLike } from "@/app/actions/blogs"
import { addToList } from "@/app/actions/readingLists"
import { getBlogById } from "@/app/services/blogs"
import { notFound } from "next/navigation"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    return notFound()
  }

  return (
    <div className="px-10 py-10 w-3xl shadow m-auto mt-10">
      <p className="text-2xl px-10 py-2 font-bold"> {blog.title} </p>
      <p className="px-10 py-2"> Written by <a className="font-bold">{blog.author}</a> </p>
      <p className="text-lg px-10 py-2"> {blog.likes} likes </p>

      <div className="flex w-full items-center justify-center">

        <form action={addLike} className="px-10">
          <input type="hidden" name="id" value={blog.id} />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 px-7 py-3 text-white rounded font-bold"
          >
            LIKE
          </button> 
        </form>

        <a href={blog.url} className="bg-violet-400 hover:bg-violet-500  text-white px-7 py-3 rounded font-bold"> READ </a>

        <form action={addToList} className="px-10 py-2">
          <input type="hidden" name="blogId" value={blog.id} />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-7 py-3 text-white rounded font-bold"
          >
            MARK
          </button>
        </form>

      </div>
    </div>
  )
}

export default BlogPage
