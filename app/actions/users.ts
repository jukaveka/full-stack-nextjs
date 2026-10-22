"use server"

import bcrypt from "bcryptjs"
import { addUser } from "../services/users"
import { redirect } from "next/navigation"

export const registerUser = async (formData: FormData) => {
  const username = formData.get("username") as string
  const name = formData.get("name") as string
  const password = formData.get("password") as string

  const passwordHash = await bcrypt.hash(password, 10)

  await addUser(username, name, passwordHash)

  redirect("/login")
}
