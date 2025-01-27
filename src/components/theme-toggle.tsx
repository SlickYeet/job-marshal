"use client"

import { CheckIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMounted } from "@/hooks/use-mounted"

type Themes = "dark" | "light" | "system"

export function ThemeToggle() {
  const { setTheme, themes, theme } = useTheme()
  const { mounted } = useMounted()

  const iconMap = {
    dark: <MoonIcon />,
    light: <SunIcon />,
    system: <MonitorIcon />,
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          {!mounted ? <MonitorIcon /> : iconMap[theme as Themes]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((value) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)}
            className={`${theme === value && "text-primary focus:text-primary"}`}
          >
            {iconMap[value as Themes]}
            <span className="capitalize">{value}</span>
            {theme === value && <CheckIcon className="ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
