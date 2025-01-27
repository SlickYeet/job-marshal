import { Building2Icon, User2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"

import { UserSelectionType } from "./onboarding-form"

interface UserSelectionFormProps {
  onSelect: (selection: UserSelectionType) => void
}

export function UserSelectionForm({ onSelect }: UserSelectionFormProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Welcome! Let&apos;s get started.</h2>
        <p className="text-muted-foreground">
          Choose how you would like to use our platform!
        </p>
      </div>

      <div>
        <Button
          onClick={() => onSelect("employer")}
          variant="outline"
          className="hover:border-primary hover:bg-primary/5 h-auto w-full items-center gap-4 border-2 p-6 transition-all duration-200"
        >
          <div className="bg-primary/10 flex size-12 items-center justify-center rounded-full">
            <Building2Icon className="text-primary size-6" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold">Employer</h3>
            <p className="text-muted-foreground">
              Post jobs and find exceptional talent
            </p>
          </div>
        </Button>

        <Button
          onClick={() => onSelect("employee")}
          variant="outline"
          className="hover:border-primary hover:bg-primary/5 h-auto w-full items-center gap-4 border-2 p-6 transition-all duration-200"
        >
          <div className="bg-primary/10 flex size-12 items-center justify-center rounded-full">
            <User2Icon className="text-primary size-6" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold">Employee</h3>
            <p className="text-muted-foreground">
              Find your dream job oppertunity
            </p>
          </div>
        </Button>
      </div>
    </div>
  )
}
