import { getBlogs } from "../services/blogs"

export default function Blogs() {
  const blogs = getBlogs()
  const orderedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)

  return (
    <div>
      <ul>
        {orderedBlogs.map((blog) => (
          <li key={blog.id}> 
            {blog.author}: <a href={`/blogs/${blog.id}`}>{blog.title}</a>, {blog.likes} likes
          </li>
        ))}
      </ul>
    </div>
  )
}
