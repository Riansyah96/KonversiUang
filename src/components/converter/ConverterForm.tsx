"use client"

import { useState, useMemo, useRef, useEffect, useCallback } from "react"
import {
  ArrowsRightLeftIcon,
  ArrowPathIcon,
  StarIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline"
import { Card } from "@/components/ui/Card"
import { CURRENCIES, CURRENCY_CODES } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface ConverterFormProps {
  dari: string
  ke: string
  jumlah: number
  loading: boolean
  onDariChange: (val: string) => void
  onKeChange: (val: string) => void
  onJumlahChange: (val: number) => void
  onConvert: () => void
  onSwap: () => void
  onAddFavorite: () => void
  isFavorite: boolean
}

function CurrencySelect({
  value,
  label,
  onChange,
  otherValue,
}: {
  value: string
  label: string
  onChange: (val: string) => void
  otherValue: string
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const ref = useRef<HTMLDivElement>(null)

  const filtered = useMemo(
    () =>
      CURRENCY_CODES.filter(
        (c) =>
          c.toLowerCase().includes(search.toLowerCase()) ||
          CURRENCIES[c].name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  )

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (!open) setSearch("")
  }, [open])

  return (
    <div ref={ref} className="relative">
      <label className="mb-1.5 block text-sm font-medium text-surface-600 dark:text-surface-400">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg border px-3 py-2.5 text-left transition-all",
          "border-surface-200 bg-white hover:border-primary-300",
          "dark:border-surface-700 dark:bg-surface-800 dark:hover:border-primary-600",
          "text-surface-900 dark:text-white"
        )}
      >
        <span className="text-lg leading-none">{CURRENCIES[value].flag}</span>
        <span className="font-medium">{value}</span>
        <span className="hidden xs:inline ml-auto text-xs text-surface-400">{CURRENCIES[value].symbol}</span>
        <ChevronUpDownIcon className="ml-auto h-4 w-4 text-surface-400 xs:ml-0" />
      </button>
      {open && (
        <div className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 sm:absolute sm:left-0 sm:right-0 sm:top-full sm:translate-x-0 sm:translate-y-0 sm:mt-1 sm:max-w-none">
          <div className="rounded-xl border border-surface-200 bg-white p-2 shadow-2xl dark:border-surface-700 dark:bg-surface-800 max-h-72 overflow-hidden flex flex-col">
            <input
              type="text"
              placeholder="Cari mata uang..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className="mb-1 w-full rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-surface-900 placeholder-surface-400 outline-none focus:border-primary-400 dark:border-surface-700 dark:bg-surface-900 dark:text-white dark:focus:border-primary-500"
            />
            <div className="overflow-y-auto scrollbar-none flex-1">
              {filtered.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    onChange(code)
                    setOpen(false)
                  }}
                  disabled={code === otherValue}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors",
                    code === value
                      ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                      : "text-surface-700 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-700",
                    code === otherValue && "opacity-40 cursor-not-allowed"
                  )}
                >
                  <span className="text-lg leading-none">{CURRENCIES[code].flag}</span>
                  <span className="font-medium">{code}</span>
                  <span className="ml-auto text-xs text-surface-400 truncate max-w-[120px]">{CURRENCIES[code].name}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="py-6 text-center text-sm text-surface-400">Tidak ditemukan</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function ConverterForm({
  dari,
  ke,
  jumlah,
  loading,
  onDariChange,
  onKeChange,
  onJumlahChange,
  onConvert,
  onSwap,
  onAddFavorite,
  isFavorite,
}: ConverterFormProps) {
  return (
    <Card>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
            Konversi Mata Uang
          </h2>
          <button
            onClick={onAddFavorite}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg transition-all",
              isFavorite
                ? "text-warning-500 bg-warning-50 dark:bg-warning-500/10"
                : "text-surface-400 hover:text-warning-500 hover:bg-warning-50 dark:hover:bg-warning-500/10"
            )}
            title="Tambahkan ke favorit"
          >
            <StarIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-end gap-3">
          <div className="flex-1">
            <CurrencySelect
              value={dari}
              label="Dari"
              onChange={onDariChange}
              otherValue={ke}
            />
          </div>
          <button
            type="button"
            onClick={onSwap}
            className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-surface-200 bg-white text-surface-500 transition-all hover:border-primary-300 hover:text-primary-600 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-400 dark:hover:border-primary-600 dark:hover:text-primary-400"
            title="Tukar mata uang"
          >
            <ArrowsRightLeftIcon className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <CurrencySelect
              value={ke}
              label="Ke"
              onChange={onKeChange}
              otherValue={dari}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-surface-600 dark:text-surface-400">
            Jumlah
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400 font-medium">
              {CURRENCIES[dari].symbol}
            </span>
            <input
              type="number"
              value={jumlah}
              onChange={(e) => onJumlahChange(Number(e.target.value) || 0)}
              min={0}
              step={0.01}
              className={cn(
                "w-full rounded-lg border px-9 py-2.5 text-right text-lg font-semibold transition-all outline-none",
                "border-surface-200 bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20",
                "dark:border-surface-700 dark:bg-surface-800 dark:text-white dark:focus:border-primary-500",
                "text-surface-900 placeholder-surface-400"
              )}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onConvert}
          disabled={loading || jumlah <= 0}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold text-white transition-all",
            "bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 active:scale-[0.98]",
            "shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
          )}
        >
          {loading ? (
            <>
              <ArrowPathIcon className="h-5 w-5 animate-spin" />
              Mengonversi...
            </>
          ) : (
            <>
              <ArrowsRightLeftIcon className="h-5 w-5" />
              Konversi Sekarang
            </>
          )}
        </button>
      </div>
    </Card>
  )
}
