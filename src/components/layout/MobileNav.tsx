"use client"

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { AppLogo } from "@/components/ui/AppLogo"
import { APP_NAME } from "@/lib/constants"

interface MobileNavProps {
  isOpen: boolean
  onToggle: () => void
}

export function MobileNav({ isOpen, onToggle }: MobileNavProps) {
  return (
    <header className="sticky top-0 z-[45] flex h-16 items-center justify-between border-b border-surface-200/60 bg-white/95 px-4 backdrop-blur-xl dark:border-surface-700/60 dark:bg-surface-900/95">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800"
          aria-label="Toggle menu"
        >
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
        <div className="flex items-center gap-2">
          <AppLogo size={32} />
          <span className="font-semibold text-surface-900 dark:text-white">{APP_NAME}</span>
        </div>
      </div>
      <ThemeToggle />
    </header>
  )
}
