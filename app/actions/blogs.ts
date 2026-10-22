"use server"

import { redirect } from "next/navigation"
import { addBlog, increaseBlogLikes } from "../services/blogs"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export const createBlog = async (formData: FormData) => {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string

  await addBlog(title, author, url)

  revalidatePath("/blogs")
  redirect("/blogs")
}

export const addLike = async (formData: FormData) => {
  const id = formData.get("id") as string

  await increaseBlogLikes(Number(id))

  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}
