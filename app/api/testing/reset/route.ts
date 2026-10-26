import { db } from "@/db"
import { blogs, readingLists, users } from "@/db/schema"
import { NextResponse } from "next/server"

export const DELETE = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production environment." },
      { status: 403 }
    )
  }

  await db.delete(users)
  await db.delete(blogs)
  await db.delete(readingLists)

  return NextResponse.json({ status: 204 })
}
