import Link from "next/link"
import { redirect } from "next/navigation"

import { Icons } from "@/components/icons"
import { SubmitButton } from "@/components/submit-button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { auth, signIn } from "@/server/auth"

export async function LoginForm() {
  const session = await auth()
  if (session?.user) {
    return redirect("/")
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome Back!</CardTitle>
          <CardDescription>
            Login with your Google or GitHub account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <form
              action={async () => {
                "use server"

                await signIn("google", {
                  redirectTo: "/onboarding",
                })
              }}
            >
              <SubmitButton
                label="Google"
                icon={<Icons.google />}
                variant="outline"
                className="w-full"
              />
            </form>

            <form
              action={async () => {
                "use server"

                await signIn("github", {
                  redirectTo: "/onboarding",
                })
              }}
            >
              <SubmitButton
                label="GitHub"
                icon={<Icons.github />}
                variant="outline"
                className="w-full"
              />
            </form>
          </div>
        </CardContent>
      </Card>

      <p className="text-muted-foreground text-center text-xs text-balance">
        By signing in, you agree to our{" "}
        <Link
          href="#"
          className="text-primary underline-offset-2 hover:underline"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="#"
          className="text-primary underline-offset-2 hover:underline"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  )
}
