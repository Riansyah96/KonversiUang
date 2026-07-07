"use client"

import { SunIcon, MoonIcon } from "@heroicons/react/24/outline"
import { useTheme } from "./ThemeProvider"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-lg",
        "text-surface-500 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white",
        "hover:bg-surface-100 dark:hover:bg-surface-700",
        "transition-all duration-300",
        className
      )}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  )
}
