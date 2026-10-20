export const instant = false

import { getBlogs } from "../services/blogs"

const Blogs = async ({ searchParams }: { searchParams: Promise<{ filter: string }>}) => {
  const { filter } = await searchParams
  const blogs = await getBlogs(filter)

  return (
    <div>
      <h3> Blogs </h3>
        <form action={`/blogs`}>
          <input type="text" name="filter" id="filter" />
          {"   "}
          <button type="submit"> Filter </button>
        </form>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}> 
            {blog.author}: <a href={`/blogs/${blog.id}`}>{blog.title}</a>, {blog.likes} likes
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
