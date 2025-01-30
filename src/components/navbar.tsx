import Image from "next/image"
import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { auth } from "@/server/auth"

import { UserDropdown } from "./user-dropdown"

export async function Navbar() {
  const session = await auth()

  return (
    <nav className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <h1 className="text-2xl font-bold">
          Job<span className="text-primary">Marshal</span>
        </h1>
      </Link>

      {/* Desktop Nav */}
      <div className="items-center gap-5 max-md:hidden md:flex">
        <ThemeToggle />

        <Link
          href="/post-job"
          className={buttonVariants({
            size: "lg",
          })}
        >
          Post a Job
        </Link>
        {session?.user ? (
          <UserDropdown
            name={session.user.name as string}
            email={session.user.email as string}
            image={session.user.image as string}
          />
        ) : (
          <Link
            href="/login"
            className={buttonVariants({
              size: "lg",
            })}
          >
            Log In
          </Link>
        )}
      </div>
    </nav>
  )
}
