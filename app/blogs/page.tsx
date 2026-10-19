import { getBlogs } from "../services/blogs"

export default function Blogs() {
  const blogs = getBlogs()
  return (
    <div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}> 
            {blog.author}: <a href={blog.url}>{blog.title}</a>, {blog.likes} likes 
          </li>
        ))}
      </ul>
    </div>
  )
}