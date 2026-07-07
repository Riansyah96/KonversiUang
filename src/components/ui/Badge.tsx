"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type BadgeVariant = "default" | "primary" | "success" | "danger" | "warning" | "info"

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-surface-100 text-surface-700 dark:bg-surface-700 dark:text-surface-300",
  primary:
    "bg-primary-100 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400",
  success:
    "bg-accent-50 text-accent-900 dark:bg-accent-500/10 dark:text-accent-400",
  danger:
    "bg-danger-50 text-danger-900 dark:bg-danger-500/10 dark:text-danger-400",
  warning:
    "bg-warning-50 text-warning-900 dark:bg-warning-500/10 dark:text-warning-400",
  info: "bg-blue-50 text-blue-900 dark:bg-blue-500/10 dark:text-blue-400",
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
