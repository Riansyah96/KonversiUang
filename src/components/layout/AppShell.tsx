"use client"

import { useState, type ReactNode } from "react"
import { Sidebar } from "./Sidebar"
import { MobileNav } from "./MobileNav"

export function AppShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-surface-50 text-surface-900 dark:bg-surface-900 dark:text-surface-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col min-w-0">
        <MobileNav isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto scrollbar-none">
          {children}
        </main>
      </div>
    </div>
  )
}
