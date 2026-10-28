import { addLike } from "@/app/actions/blogs"
import { addToList } from "@/app/actions/readingLists"
import { getCurrentUserWithReadingList } from "@/app/actions/session"
import { getBlogById } from "@/app/services/blogs"
import { notFound, redirect } from "next/navigation"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))
  const user = await getCurrentUserWithReadingList()

  if (!blog) {
    return notFound()
  }

  if (!user) {
    redirect("/login")
  }

  const readingListBlogIds = user.readingLists.map((list) => list.blogs.id)
  const unmarked = blog.userId !== user.id && !readingListBlogIds.includes(blog.id)

  return (
    <div data-testid="blog-detail" className="px-10 py-10 w-3xl shadow m-auto mt-10">
      <p data-testid="blog-title" className="text-2xl px-10 py-2 font-bold"> {blog.title} </p>
      <p data-testid="blog-author" className="px-10 py-2"> Written by <a className="font-bold">{blog.author}</a> </p>
      <p className="text-lg px-10 py-2"> {blog.likes} likes </p>

      <div className="flex w-full items-center justify-center gap-10 py-5">

        <form action={addLike}>
          <input type="hidden" name="id" value={blog.id} />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 px-3 py-3 text-white rounded font-bold w-35"
          >
            LIKE
          </button> 
        </form>

        <a href={blog.url}>
          <button className="bg-violet-400 hover:bg-violet-500  text-white px-7 py-3 rounded font-bold w-35">
            READ
          </button>
        </a>

        {unmarked ? (
          <form action={addToList}>
            <input type="hidden" name="blogId" value={blog.id} />
            <button
              type="submit"
              data-testid="add-to-reading-list-button"
              className="bg-blue-500 hover:bg-blue-600 px-x py-3 text-white rounded font-bold w-35"
            >
              MARK
            </button>
          </form>
        ) : (
            <button disabled className="bg-gray-200 px-3 py-3 text-gray-400 rounded font-bold w-35">
              MARKED
            </button>
        )}

      </div>
    </div>
  )
}

export default BlogPage
