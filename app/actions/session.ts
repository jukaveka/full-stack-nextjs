import { auth } from "@/auth"
import { getUserByUsername, getUserWithReadingList } from "../services/users"

export const getCurrentUser = async () => {
  const session = await auth()
  if (!session?.user?.email) {
    return null
  }

  return await getUserByUsername(session.user.email)
}

export const getCurrentUserWithReadingList = async () => {
  const session = await auth()
  if (!session?.user?.email) {
    return null
  }

  return await getUserWithReadingList(session.user.email)
}
