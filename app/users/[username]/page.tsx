export const instant = false

import { getUserWithBlogs } from "@/app/services/users"
import { notFound } from "next/navigation"

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params
  const user = await getUserWithBlogs(username)

  if (!user) {
    return notFound()
  }

  return (
    <div>
      <h3> User profile </h3>
      <h5> {user.name} </h5>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage
