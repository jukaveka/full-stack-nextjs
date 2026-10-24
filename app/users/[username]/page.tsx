import { getUserWithBlogs } from "@/app/services/users"
import { notFound } from "next/navigation"

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params
  const user = await getUserWithBlogs(username)

  if (!user) {
    return notFound()
  }

  return (
    <div className="px-10">
      <p className="text-3xl py-5"> User profile </p>
      <p className="text-xl py-2 font-bold"> {user.name} </p>
      <p className="text-lg py-2"> Blogs added by <a className="font-bold">{user.username}</a></p>
      <ul className="shadow px-5 py-5">
        {user.blogs.map((blog) => (
          <li key={blog.id} className="py-1">
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage
