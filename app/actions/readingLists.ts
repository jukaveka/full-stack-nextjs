"use server"

import { revalidatePath } from "next/cache"
import { addBlogToList, markBlogAsRead } from "../services/readingLists"
import { getCurrentUser } from "./session"
import { redirect } from "next/navigation"

export const markAsRead = async (formData: FormData) => {
  const id = formData.get("listId") as string

  await markBlogAsRead(Number(id))

  revalidatePath("/me")
}

export const addToList = async (formData: FormData) => {
  const blogId = formData.get("blogId") as string
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  await addBlogToList(user?.id, Number(blogId))

  revalidatePath(`/blog/${blogId}`)
  revalidatePath("/me")
}
