import { db } from "@/db"
import { readingLists } from "@/db/schema"
import { eq } from "drizzle-orm"

export const markBlogAsRead = async (listId: number) => {
  return await db
    .update(readingLists)
    .set({ read: true })
    .where(eq(readingLists.id, listId))
}
