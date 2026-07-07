"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CurrencyDollarIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { AppLogo } from "@/components/ui/AppLogo"
import { cn } from "@/lib/utils"
import { APP_NAME } from "@/lib/constants"

const navItems = [
  { href: "/", label: "Konverter", icon: CurrencyDollarIcon },
  { href: "/about", label: "Tentang Developer", icon: InformationCircleIcon },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-60 flex-col border-r border-surface-200/60 bg-white/95 backdrop-blur-xl dark:border-surface-700/60 dark:bg-surface-900/95",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-surface-200/60 px-5 dark:border-surface-700/60">
          <div className="flex items-center gap-3">
            <AppLogo size={36} />
            <span className="font-semibold text-surface-900 dark:text-white">{APP_NAME}</span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-surface-400 hover:bg-surface-100 hover:text-surface-600 dark:hover:bg-surface-800 dark:hover:text-white"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                    : "text-surface-600 hover:bg-surface-100 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-surface-200/60 p-4 dark:border-surface-700/60">
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <span className="text-sm text-surface-500 dark:text-surface-400">Tema</span>
          </div>
        </div>
      </aside>
    </>
  )
}
