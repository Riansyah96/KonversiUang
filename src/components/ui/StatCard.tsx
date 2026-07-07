"use client"

import type { ReactNode } from "react"
import { Card } from "./Card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string | number
  icon?: ReactNode
  color?: "primary" | "success" | "danger" | "warning" | "info"
  className?: string
}

const iconStyles = {
  primary: "bg-primary-100 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400",
  success: "bg-accent-50 text-accent-600 dark:bg-accent-500/10 dark:text-accent-400",
  danger: "bg-danger-50 text-danger-600 dark:bg-danger-500/10 dark:text-danger-400",
  warning: "bg-warning-50 text-warning-600 dark:bg-warning-500/10 dark:text-warning-400",
  info: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
}

export function StatCard({ label, value, icon, color = "primary", className }: StatCardProps) {
  return (
    <Card className={cn("flex items-center gap-4", className)}>
      {icon && (
        <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", iconStyles[color])}>
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-sm text-surface-500 dark:text-surface-400">{label}</p>
        <p className="text-xl font-semibold text-surface-900 dark:text-white">{value}</p>
      </div>
    </Card>
  )
}
