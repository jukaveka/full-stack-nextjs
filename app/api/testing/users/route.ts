import { db } from "@/db"
import { users } from "@/db/schema"
import bcrypt from "bcryptjs"
import { NextResponse, NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production environment." },
      { status: 403 }
  )}

  if (!req.body) {
    return NextResponse.json(
      { error: "Empty request body" },
      { status: 400 }
    )
  }

  const { username, name, password } = await req.json()
  const passwordHash = await bcrypt.hash(password, 10)

  const user = await db.insert(users).values({ username, name, passwordHash }).returning()

  return NextResponse.json(
    { body: user },
    { status: 201 }
  )
}
