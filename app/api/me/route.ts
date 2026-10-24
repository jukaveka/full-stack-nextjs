import { getUserByToken } from "@/app/services/users"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  const headersList = await headers()
  const authorization = headersList.get("authorization")

  if (!authorization) {
    return NextResponse.json(
      { error: "Token is required "}, 
      { status: 401 }
    )
  }

  const token = authorization.substring(7)
  const user = await getUserByToken(token)

  if (!user) {
    return NextResponse.json(
      { error: "Invalid token "}, 
      { status: 401 }
    )
  }

  return NextResponse.json(user)
}
