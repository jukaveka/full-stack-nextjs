import { auth } from "@/auth"
import { getUserWithReadingList } from "../services/users"

export const getCurrentUser = async () => {
  const session = await auth()
  if (!session?.user?.email) {
    return null
  }

  return await getUserWithReadingList(session.user.email)
}
