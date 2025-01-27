"use server"

import { redirect } from "next/navigation"
import { z } from "zod"

import { db } from "@/server/db"
import { requireUser } from "@/utils/require-user"
import { EmployerSchema } from "@/validators"

export async function createEmployer(
  values: z.infer<typeof EmployerSchema>,
): Promise<void> {
  const { user } = await requireUser()
  if (!user) {
    throw new Error("Unauthorized")
  }

  const validateValues = EmployerSchema.parse(values)

  await db.user.update({
    where: { id: user.id },
    data: {
      type: "EMPLOYER",
      onboardingCompleted: true,
      employer: {
        create: {
          ...validateValues,
        },
      },
    },
  })

  return redirect("/")
}
