"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export function Card({ children, className, hover, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-xl border border-surface-200/60 dark:border-surface-700/60",
        "bg-white dark:bg-surface-800 p-5 transition-all duration-300",
        hover && "hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg hover:shadow-primary-500/5",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  )
}
