"use client"

import { Loader2 } from "lucide-react"
import { ReactNode } from "react"
import { useFormStatus } from "react-dom"

import { Button, ButtonProps } from "@/components/ui/button"

interface SubmitButtonProps extends ButtonProps {
  label: string
  icon?: ReactNode
}

export function SubmitButton({
  label,
  icon,
  size,
  variant,
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      disabled={pending}
      size={size}
      variant={variant}
      className={className}
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" />
          <span>Submitting...</span>
        </>
      ) : (
        <>
          {icon && <div>{icon}</div>}
          <span>{label}</span>
        </>
      )}
    </Button>
  )
}
