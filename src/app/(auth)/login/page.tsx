import Image from "next/image"
import Link from "next/link"

import { LoginForm } from "./_components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <h1 className="text-2xl font-bold">
            Job<span className="text-primary">Marshal</span>
          </h1>
        </Link>

        <LoginForm />
      </div>
    </div>
  )
}
