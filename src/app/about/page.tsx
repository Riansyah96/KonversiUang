"use client"

import { DeveloperInfo } from "@/components/developer/DeveloperInfo"

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 pb-8 sm:p-6 lg:p-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white sm:text-3xl">
          Tentang Developer
        </h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">
          Informasi mengenai pengembang aplikasi KonversiUang
        </p>
      </div>

      <DeveloperInfo />
    </div>
  )
}
