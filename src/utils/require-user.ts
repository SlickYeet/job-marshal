import type { Session, User } from "next-auth"
import { redirect } from "next/navigation"

import { auth } from "@/server/auth"

export async function requireUser(): Promise<ReturnType> {
  const session = await auth()
  if (!session || !session.user) {
    redirect("/login")
  }

  return {
    session: session,
    user: session.user,
  }
}

type ReturnType = {
  session: Session
  user: User
}
