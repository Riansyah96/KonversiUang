"use client"

import { Card } from "@/components/ui/Card"
import { CURRENCIES } from "@/lib/constants"
import { TrashIcon, ArrowRightIcon, StarIcon } from "@heroicons/react/24/outline"

interface FavoritesPanelProps {
  favorites: [string, string][]
  onLoad: (pair: [string, string]) => void
  onRemove: (pair: [string, string]) => void
}

export function FavoritesPanel({ favorites, onLoad, onRemove }: FavoritesPanelProps) {
  if (favorites.length === 0) {
    return (
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-surface-900 dark:text-white">Favorit</h3>
          <StarIcon className="h-5 w-5 text-surface-400" />
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-surface-400">
          <StarIcon className="h-10 w-10 mb-2" />
          <p className="text-sm">Belum ada favorit</p>
          <p className="text-xs mt-1">Klik ikon bintang untuk menambahkan</p>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <StarIcon className="h-5 w-5 text-warning-500" />
        <h3 className="text-base font-semibold text-surface-900 dark:text-white">Favorit</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {favorites.map((pair, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg bg-surface-50 p-2.5 dark:bg-surface-700/50 group"
          >
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              <span className="text-base">{CURRENCIES[pair[0]]?.flag}</span>
              <span className="text-sm font-medium text-surface-900 dark:text-white">{pair[0]}</span>
              <ArrowRightIcon className="h-3 w-3 text-surface-400" />
              <span className="text-base">{CURRENCIES[pair[1]]?.flag}</span>
              <span className="text-sm font-medium text-surface-900 dark:text-white">{pair[1]}</span>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onLoad(pair)}
                className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-100 text-primary-600 hover:bg-primary-200 dark:bg-primary-900/20 dark:text-primary-400 dark:hover:bg-primary-900/30"
                title="Gunakan pasangan ini"
              >
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onRemove(pair)}
                className="flex h-7 w-7 items-center justify-center rounded-md bg-danger-50 text-danger-500 hover:bg-danger-100 dark:bg-danger-500/10 dark:text-danger-400 dark:hover:bg-danger-500/20"
                title="Hapus dari favorit"
              >
                <TrashIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
