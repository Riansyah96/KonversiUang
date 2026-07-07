"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { CURRENCIES, POPULAR_CURRENCIES } from "@/lib/constants"
import { getLatestRates, type RateResponse } from "@/lib/api"
import { formatNumber } from "@/lib/utils"
import { ArrowPathIcon } from "@heroicons/react/24/outline"

interface RateTableProps {
  base: string
}

export function RateTable({ base }: RateTableProps) {
  const [rates, setRates] = useState<RateResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRates() {
      setLoading(true)
      setError(null)
      try {
        const data = await getLatestRates(base)
        setRates(data)
      } catch (e) {
        setError(e instanceof Error ? e.message : "Gagal memuat kurs")
      } finally {
        setLoading(false)
      }
    }
    fetchRates()
  }, [base])

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-surface-900 dark:text-white">
          Kurs Mata Uang Terkini
        </h3>
        <Badge variant="primary">
          Base: {base}
        </Badge>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <ArrowPathIcon className="h-5 w-5 animate-spin text-primary-500" />
        </div>
      ) : error ? (
        <p className="text-sm text-danger-500">{error}</p>
      ) : rates ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-100 dark:border-surface-700">
                <th className="pb-2 text-left font-medium text-surface-500 dark:text-surface-400">Mata Uang</th>
                <th className="pb-2 text-right font-medium text-surface-500 dark:text-surface-400">Kurs</th>
                <th className="pb-2 text-right font-medium text-surface-500 dark:text-surface-400">1 {base}</th>
              </tr>
            </thead>
            <tbody>
              {POPULAR_CURRENCIES.filter((c) => c !== base).map((code) => {
                const rate = rates.rates[code]
                return (
                  <tr
                    key={code}
                    className="border-b border-surface-50 last:border-0 dark:border-surface-700/50"
                  >
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{CURRENCIES[code]?.flag}</span>
                        <span className="font-medium text-surface-900 dark:text-white">{code}</span>
                        <span className="text-xs text-surface-400">{CURRENCIES[code]?.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-right font-medium text-surface-900 dark:text-white">
                      {rate ? formatNumber(rate) : "-"}
                    </td>
                    <td className="py-2.5 text-right text-surface-500 dark:text-surface-400">
                      {rate ? formatNumber(1 / rate) : "-"}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : null}

      {rates?.date && (
        <p className="mt-3 text-xs text-surface-400">
          Tanggal kurs: {new Date(rates.date).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
    </Card>
  )
}
