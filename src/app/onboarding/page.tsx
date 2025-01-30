import { redirect } from "next/navigation"

import { db } from "@/server/db"
import { requireUser } from "@/utils/require-user"

import { OnboardingForm } from "./_components/onboarding-form"

async function hasUserCompletedOnboarding(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { onboardingCompleted: true },
  })
  if (user?.onboardingCompleted === true) {
    return redirect("/")
  }
  return user
}

export default async function OnboardingPage() {
  const { user } = await requireUser()
  await hasUserCompletedOnboarding(user.id as string)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-10">
      <OnboardingForm />
    </div>
  )
}
