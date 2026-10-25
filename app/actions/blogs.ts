"use server"

import { redirect } from "next/navigation"
import { addBlog, increaseBlogLikes } from "../services/blogs"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export const createBlog = async (prevState: { errors: object, values: object, success: boolean }, formData: FormData) => {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const errors = { title: "", author: "", url: "" }

  const title = formData.get("title") as string
  if (!title || title.length < 5 ) {
    errors.title = "Title is required and must be at least 5 characters long."
  }

  const author = formData.get("author") as string
  if (!author || author.length < 5 ) {
    errors.author = "Author is required and must be at least 5 characters long."
  }

  const url = formData.get("url") as string
  if (!url || url.length < 5 ) {
    errors.url = "URL is required and must be at least 5 characters long."
  }

  const hasErrors = errors.title.length > 0 || errors.author.length > 0 || errors.url.length > 0

  if (hasErrors) {
    return { errors, values: { title, author, url }, success: false }
  }

  await addBlog(title, author, url)

  revalidatePath("/blogs")
  revalidatePath("/me")
  return { errors, values: { title, author, url }, success: true }
}

export const addLike = async (formData: FormData) => {
  const id = formData.get("id") as string

  await increaseBlogLikes(Number(id))

  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}
