"use client"

import { useConverter } from "@/hooks/useConverter"
import { ConverterForm } from "@/components/converter/ConverterForm"
import { ResultCard } from "@/components/converter/ResultCard"
import { RateTable } from "@/components/converter/RateTable"
import { HistoryPanel } from "@/components/converter/HistoryPanel"
import { FavoritesPanel } from "@/components/converter/FavoritesPanel"
import { StatCard } from "@/components/ui/StatCard"
import {
  CurrencyDollarIcon,
  ArrowPathIcon,
  StarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"
import { useCallback } from "react"

export default function HomePage() {
  const {
    dari, ke, jumlah, hasil, kurs, inverse, loading, error,
    waktuUpdate, totalKonversi, history, favorites,
    setDari, setKe, setJumlah, doConvert, swapCurrencies,
    addFavorite, removeFavorite, loadFavorite, reset, clearHistory,
  } = useConverter()

  const isFavorite = favorites.some(([a, b]) => a === dari && b === ke)

  const handleConvert = useCallback(() => {
    doConvert()
  }, [doConvert])

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 pb-8 sm:p-6 lg:p-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white sm:text-3xl">
          Konversi Mata Uang
        </h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">
          Konversi nilai mata uang dunia dengan kurs real-time
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-700 dark:border-danger-800 dark:bg-danger-900/20 dark:text-danger-400">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ConverterForm
            dari={dari}
            ke={ke}
            jumlah={jumlah}
            loading={loading}
            onDariChange={setDari}
            onKeChange={setKe}
            onJumlahChange={setJumlah}
            onConvert={handleConvert}
            onSwap={swapCurrencies}
            onAddFavorite={addFavorite}
            isFavorite={isFavorite}
          />

          {hasil !== null && kurs !== null && inverse !== null && waktuUpdate && (
            <ResultCard
              dari={dari}
              ke={ke}
              jumlah={jumlah}
              hasil={hasil}
              kurs={kurs}
              inverse={inverse}
              waktuUpdate={waktuUpdate}
            />
          )}

          <RateTable base={dari} />

          <HistoryPanel history={history} onClear={clearHistory} />
        </div>

        <div className="space-y-6">
          <StatCard
            label="Total Konversi"
            value={totalKonversi}
            icon={<CurrencyDollarIcon className="h-6 w-6" />}
            color="primary"
          />

          <StatCard
            label="Total Favorit"
            value={favorites.length}
            icon={<StarIcon className="h-6 w-6" />}
            color="warning"
          />

          <StatCard
            label="Riwayat"
            value={history.length}
            icon={<ClockIcon className="h-6 w-6" />}
            color="info"
          />

          <FavoritesPanel
            favorites={favorites}
            onLoad={loadFavorite}
            onRemove={removeFavorite}
          />

          <button
            onClick={reset}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-surface-200 bg-white px-4 py-2.5 text-sm font-medium text-surface-600 hover:bg-surface-50 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700 transition-all"
          >
            <ArrowPathIcon className="h-4 w-4" />
            Reset Aplikasi
          </button>
        </div>
      </div>
    </div>
  )
}
