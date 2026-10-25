"use server"

import { revalidatePath } from "next/cache"
import { markBlogAsRead } from "../services/readingLists"

export const markAsRead = async (formData: FormData) => {
  const id = formData.get("listId") as string

  await markBlogAsRead(Number(id))

  revalidatePath("/me")
}
