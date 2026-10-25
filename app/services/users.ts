import { eq } from "drizzle-orm"
import { db } from "../../db"
import { users } from "../../db/schema"

export const getUsers = async () => {
  return db.query.users.findMany()
}

export const getUserByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username)
  })
}

export const getUserWithBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true }
  })
}

export const addUser = async (username: string, name: string, passwordHash: string) => {
  return await db.insert(users).values({ username, name, passwordHash })
}

export const updateToken = async (userId: number, newToken: string) => {
  return await db
    .update(users)
    .set({ token: newToken })
    .where(eq(users.id, userId))
}

export const getUserByToken = async (token: string) => {
  return db.query.users.findFirst({
    where: eq(users.token, token),
    with: { blogs: true }
  })
}

export const getUserWithReadingList = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: {
      readingLists: {
        columns: { read: true, id: true },
        with: {
          blogs: true
        }
    }}
  })
}
