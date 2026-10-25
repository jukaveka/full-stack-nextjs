import { blogs, readingLists } from "../../db/schema"
import { db } from "../../db"
import { desc, eq, like } from "drizzle-orm"
import { getCurrentUser } from "../actions/session"


export const getBlogs = async (filter: string) => {
  if (filter) {
    return db.query.blogs.findMany({
      where: like(blogs.title, `%${filter}%`),
      orderBy: desc(blogs.likes)
    })
  }

  return db.query.blogs.findMany({
    orderBy: desc(blogs.likes)
  })
}

export const addBlog = async (title: string, author: string, url: string) => {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Operation requires login")
  }

  const blog = await db.insert(blogs).values({ title, author, url, userId: user.id}).returning({ id: blogs.id})
  return await db.insert(readingLists).values({ userId: user.id, blogId: blog[0].id})
}

export const getBlogById = async (id: number) => {
  return await db.query.blogs.findFirst({ where: eq(blogs.id, id) })
}

export const increaseBlogLikes = async (id: number) => {
  const blog = await getBlogById(id)

  if (!blog) {
    return null
  }

  const increasedLikes = blog.likes + 1

  return await db.update(blogs)
    .set({ likes: increasedLikes })
    .where(eq(blogs.id, id))
}
