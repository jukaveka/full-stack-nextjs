export const instant = false

import { getBlogs } from "../services/blogs"

const Blogs = async ({ searchParams }: { searchParams: Promise<{ filter: string }>}) => {
  const { filter } = await searchParams
  let listedBlogs
  const blogs = getBlogs()
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)

  if (filter) {
    listedBlogs = sortedBlogs.filter((blog) => blog.title.toLowerCase().includes(filter.toLowerCase()))
  } else {
    listedBlogs = sortedBlogs
  }

  return (
    <div>
      <h3> Blogs </h3>
        <form action={`/blogs`}>
          <label>
            Filter
            <input type="text" name="filter" id="filter" />
          </label>
          {"   "}
          <button type="submit"> Filter </button>
        </form>
      <ul>
        {listedBlogs.map((blog) => (
          <li key={blog.id}> 
            {blog.author}: <a href={`/blogs/${blog.id}`}>{blog.title}</a>, {blog.likes} likes
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
