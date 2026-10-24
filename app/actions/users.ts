"use server"

import bcrypt from "bcryptjs"
import { addUser, updateToken } from "../services/users"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { users } from "@/db/schema"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export const registerUser = async (prevState: { errors: object, values: object }, formData: FormData) => {
  const errors = { username: "", name: "", password: "", passwordConfirm: "" }

  const username = formData.get("username") as string
  if (!username || username.length < 4) {
    errors.username = "Username is required and has to be at least 4 characters long"
  }

  const user = await db.query.users.findFirst({
    where: eq(users.username, username)
  })
  if (user) {
    errors.username = "Username is already in use. Choose another username"
  }

  const name = formData.get("name") as string
  if (!name) {
    errors.name = "Name is required"
  }

  const password = formData.get("password") as string
  if (!password || password.length < 4) {
    errors.password = "Password is required and has to be at least 4 characters long"
  }

  const passwordConfirm = formData.get("passwordConfirm") as string
  if(password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords don't match"
  }

  const hasErrors = errors.username.length > 0 || errors.name.length > 0 || errors.password.length > 0 || errors.passwordConfirm.length > 0

  if (hasErrors) {
    return { errors, values: { username, name, password, passwordConfirm } }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await addUser(username, name, passwordHash)

  redirect("/login")
}

export const generateToken = async (formData: FormData) => {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const userId = formData.get("userId") as string
  const token = crypto.randomUUID()

  await updateToken(Number(userId), token)

  revalidatePath("/me")
}
