import { ReactNode } from "react"

import { Navbar } from "@/components/navbar"

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
      <Navbar />
      {children}
    </div>
  )
}
