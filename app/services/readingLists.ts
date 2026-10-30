import { db } from "@/db"
import { blogs, readingLists } from "@/db/schema"
import { eq } from "drizzle-orm"

export const markBlogAsRead = async (listId: number) => {
  return await db
    .update(readingLists)
    .set({ read: true })
    .where(eq(readingLists.id, listId))
}

export const addBlogToList = async (userId: number, blogId: number) => {
  return await db
    .insert(readingLists)
    .values({ userId, blogId })
}

export const getListsByUserId = async (userId: number) => {
  return await db.query.readingLists.findMany({
    where: eq(readingLists.userId, userId),
    with: {
      blogs: {
        columns: { id: true, title: true, url: true }
      }
    }
  })
}