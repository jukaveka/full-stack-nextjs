export const instant = false

import { getBlogs } from "../services/blogs"

const Blogs = async ({ searchParams }: { searchParams: Promise<{ filter: string }>}) => {
  const { filter } = await searchParams
  const blogs = await getBlogs(filter)

  return (
    <div className="bg-mist-100">

      <p className="text-3xl px-10 py-5"> Blogs </p>

      <form action={`/blogs`} className="px-10 pb-5">
        <input
          type="text"
          name="filter"
          id="filter"
          className="shadow border rounded text-gray-800 focus:outline-none focus:shadow-outline mr-2"
        />
        <button
          type="submit"
          className="bg-slate-600 px-5 py-1 text-white rounded text-bold"
        >
          Filter
        </button>
      </form>

      <ul className="px-10">
        {blogs.map((blog) => (
          <li key={blog.id} className="py-1">
            <a className="font-bold pr-1">{blog.author}: </a>
            <a href={`/blogs/${blog.id}`} className="text-blue-500 underline pr-1">{blog.title},</a>
            {blog.likes} likes
          </li>
        ))}
      </ul>

    </div>
  )
}

export default Blogs
