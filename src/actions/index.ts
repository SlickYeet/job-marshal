"use server"

import { request } from "@arcjet/next"
import { redirect } from "next/navigation"
import { z } from "zod"

import { db } from "@/server/db"
import arcjet, { detectBot, shield } from "@/utils/arcjet"
import { requireUser } from "@/utils/require-user"
import { EmployeeSchema, EmployerSchema } from "@/validators"

const isProduction = process.env.NODE_ENV === "production"

const aj = arcjet
  .withRule(shield({ mode: isProduction ? "LIVE" : "DRY_RUN" }))
  .withRule(detectBot({ mode: isProduction ? "LIVE" : "DRY_RUN", allow: [] }))

export async function createEmployer(
  values: z.infer<typeof EmployerSchema>,
): Promise<void> {
  const { user } = await requireUser()

  const req = await request()
  const decision = await aj.protect(req)
  if (decision.isDenied()) {
    throw new Error("Forbidden")
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

export async function createEmployee(
  values: z.infer<typeof EmployeeSchema>,
): Promise<void> {
  const { user } = await requireUser()

  const req = await request()
  const decision = await aj.protect(req)
  if (decision.isDenied()) {
    throw new Error("Forbidden")
  }

  const validateValues = EmployeeSchema.parse(values)

  await db.user.update({
    where: { id: user.id },
    data: {
      type: "EMPLOYEE",
      onboardingCompleted: true,
      employee: {
        create: {
          ...validateValues,
        },
      },
    },
  })

  return redirect("/")
}
