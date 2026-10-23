"use server"

import { redirect } from "next/navigation"
import { addBlog, increaseBlogLikes } from "../services/blogs"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export const createBlog = async (prevState: { error: string }, formData: FormData) => {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  if (!title || title.length < 5 ) {
    return { error: "Title is required and must be at least 5 characters long."}
  }

  const author = formData.get("author") as string
  if (!author || author.length < 5 ) {
    return { error: "Author is required and must be at least 5 characters long."}
  }

  const url = formData.get("url") as string
  if (!url || url.length < 5 ) {
    return { error: "URL is required and must be at least 5 characters long."}
  }

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
