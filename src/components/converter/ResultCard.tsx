"use client"

import { Card } from "@/components/ui/Card"
import { CURRENCIES } from "@/lib/constants"
import { formatNumber } from "@/lib/utils"

interface ResultCardProps {
  dari: string
  ke: string
  jumlah: number
  hasil: number
  kurs: number
  inverse: number
  waktuUpdate: string
}

export function ResultCard({ dari, ke, jumlah, hasil, kurs, inverse, waktuUpdate }: ResultCardProps) {
  const dariInfo = CURRENCIES[dari]
  const keInfo = CURRENCIES[ke]

  return (
    <Card className="overflow-hidden border-primary-200/60 dark:border-primary-800/60">
      <div className="space-y-4">
        <div className="rounded-lg bg-gradient-to-br from-primary-50 to-primary-100/50 p-4 sm:p-6 text-center dark:from-primary-900/20 dark:to-primary-800/10">
          <p className="mb-1 text-xs sm:text-sm font-medium text-surface-500 dark:text-surface-400">
            Hasil Konversi
          </p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white break-all">
            {keInfo.flag} {formatNumber(hasil)} {ke}
          </p>
          <p className="mt-1 text-xs sm:text-sm text-surface-500 dark:text-surface-400">
            {dariInfo.flag} {formatNumber(jumlah)} {dari}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <div className="rounded-lg bg-surface-50 p-2.5 sm:p-3 text-center dark:bg-surface-700/50">
            <p className="text-xs text-surface-500 dark:text-surface-400">Kurs</p>
            <p className="text-sm sm:text-base font-semibold text-surface-900 dark:text-white break-all">
              1 {dari} = {formatNumber(kurs)} {ke}
            </p>
          </div>
          <div className="rounded-lg bg-surface-50 p-2.5 sm:p-3 text-center dark:bg-surface-700/50">
            <p className="text-xs text-surface-500 dark:text-surface-400">Kurs Invers</p>
            <p className="text-sm sm:text-base font-semibold text-surface-900 dark:text-white break-all">
              1 {ke} = {formatNumber(inverse)} {dari}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-surface-400">
          <span>Terakhir diperbarui:</span>
          <span className="font-medium text-surface-500 dark:text-surface-300 text-center">{waktuUpdate}</span>
        </div>
      </div>
    </Card>
  )
}
