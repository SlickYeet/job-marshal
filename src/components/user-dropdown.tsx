import {
  ChevronDownIcon,
  HeartIcon,
  Layers2Icon,
  LogOutIcon,
} from "lucide-react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/server/auth"

interface UserDropdownProps {
  name: string
  email: string
  image: string
}

export function UserDropdown({ name, email, image }: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src={image} alt="user image" />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>

          <ChevronDownIcon className="ml-1 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-foreground text-sm font-medium">{name}</span>
          <span className="text-muted-foreground text-xs">{email}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/saved-jobs">
              <HeartIcon className="opacity-60" />
              <span className="">Saved Jobs</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/my-jobs">
              <Layers2Icon className="opacity-60" />
              <span className="">My Job Listings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <button
            onClick={async () => {
              "use server"

              await signOut({
                redirectTo: "/",
              })
            }}
            className="flex w-full items-center gap-2"
          >
            <LogOutIcon className="size-4 opacity-60" />
            <span>Logout</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
