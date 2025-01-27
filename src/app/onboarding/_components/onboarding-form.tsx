"use client"

import { ChevronLeftIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { EmployeeForm } from "./employee-form"
import { EmployerForm } from "./employer-form"
import { UserSelectionForm } from "./user-selection-form"

export type UserSelectionType = "employer" | "employee" | null

export function OnboardingForm() {
  const [step, setStep] = useState<number>(1)
  const [userSelection, setUserSelection] = useState<UserSelectionType>(null)

  const handleUserSelection = (selection: UserSelectionType) => {
    setUserSelection(selection)
    setStep(2)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <UserSelectionForm onSelect={handleUserSelection} />

      case 2:
        return userSelection === "employer" ? (
          <EmployerForm />
        ) : userSelection === "employee" ? (
          <EmployeeForm />
        ) : (
          <p>How did you get here? Something went wrong.</p>
        )

      default:
        return null
    }
  }

  return (
    <>
      <div className="relative flex w-full max-w-lg items-center justify-center">
        {step === 2 && (
          <Button
            onClick={() => setStep(1)}
            variant="ghost"
            className="absolute left-0 mb-10"
          >
            <ChevronLeftIcon />
            Back
          </Button>
        )}
        <div className="mb-10 flex items-center gap-4">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <h1 className="text-4xl font-bold">
            Job<span className="text-primary">Marshal</span>
          </h1>
        </div>
      </div>

      <Card className="w-full max-w-lg">
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>
    </>
  )
}
