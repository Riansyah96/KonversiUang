"use client"

import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { CURRENCIES } from "@/lib/constants"
import { formatNumber } from "@/lib/utils"
import { TrashIcon, ClockIcon } from "@heroicons/react/24/outline"
import type { HistoryEntry } from "@/types"

interface HistoryPanelProps {
  history: HistoryEntry[]
  onClear: () => void
}

function EntryCard({ entry }: { entry: HistoryEntry }) {
  return (
    <div className="rounded-lg bg-surface-50 p-3 dark:bg-surface-700/50">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="text-base leading-none">{CURRENCIES[entry.dari]?.flag}</span>
        <span className="text-sm font-medium text-surface-900 dark:text-white">
          {formatNumber(entry.jumlah)} {entry.dari}
        </span>
        <span className="text-surface-300 dark:text-surface-600">→</span>
        <span className="text-base leading-none">{CURRENCIES[entry.ke]?.flag}</span>
        <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
          {formatNumber(entry.hasil)} {entry.ke}
        </span>
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-surface-400">
        <span>Kurs: 1 {entry.dari} = {formatNumber(entry.kurs)} {entry.ke}</span>
        <span className="sm:ml-auto">{entry.waktu}</span>
      </div>
    </div>
  )
}

export function HistoryPanel({ history, onClear }: HistoryPanelProps) {
  if (history.length === 0) {
    return (
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-surface-900 dark:text-white">Riwayat Konversi</h3>
          <ClockIcon className="h-5 w-5 text-surface-400" />
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-surface-400">
          <ClockIcon className="h-10 w-10 mb-2" />
          <p className="text-sm">Belum ada riwayat konversi</p>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-surface-900 dark:text-white">Riwayat Konversi</h3>
          <Badge>{history.length}</Badge>
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-500/10 transition-colors"
        >
          <TrashIcon className="h-4 w-4" />
          Hapus Semua
        </button>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-none">
        {history.map((entry, i) => (
          <EntryCard key={i} entry={entry} />
        ))}
      </div>
    </Card>
  )
}
