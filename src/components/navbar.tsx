import { LogInIcon, LogOutIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button, buttonVariants } from "@/components/ui/button"
import { auth, signOut } from "@/server/auth"

export async function Navbar() {
  const session = await auth()

  return (
    <nav className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <h1 className="hidden text-2xl font-bold sm:block">
          Job<span className="text-primary">Marshal</span>
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        {session?.user ? (
          <form
            action={async () => {
              "use server"

              await signOut({
                redirectTo: "/",
              })
            }}
          >
            <Button variant="outline">
              <LogOutIcon />
              Logout
            </Button>
          </form>
        ) : (
          <Link
            href="/login"
            className={buttonVariants({
              variant: "default",
            })}
          >
            <LogInIcon />
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
