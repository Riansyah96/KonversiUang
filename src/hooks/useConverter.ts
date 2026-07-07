"use client"

import { useState, useCallback } from "react"
import { useLocalStorage } from "./useLocalStorage"
import { convertCurrency } from "@/lib/api"
import { CURRENCY_CODES, CURRENCIES } from "@/lib/constants"
import type { HistoryEntry } from "@/types"

export function useConverter() {
  const [dari, setDari] = useState("USD")
  const [ke, setKe] = useState("IDR")
  const [jumlah, setJumlah] = useState(1)
  const [hasil, setHasil] = useState<number | null>(null)
  const [kurs, setKurs] = useState<number | null>(null)
  const [inverse, setInverse] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [waktuUpdate, setWaktuUpdate] = useState<string | null>(null)
  const [totalKonversi, setTotalKonversi] = useLocalStorage("konversiuang_total", 0)
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>("konversiuang_history", [])
  const [favorites, setFavorites] = useLocalStorage<[string, string][]>("konversiuang_favorites", [])

  const doConvert = useCallback(async () => {
    if (jumlah <= 0) {
      setError("Jumlah harus lebih dari 0")
      return
    }
    setLoading(true)
    setError(null)
    try {
      const result = await convertCurrency(dari, ke, jumlah)
      setHasil(result.hasil)
      setKurs(result.kurs)
      setInverse(result.inverse)
      const now = new Date().toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        dateStyle: "full",
        timeStyle: "medium",
      })
      setWaktuUpdate(now)
      setTotalKonversi((prev) => prev + 1)
      const entry: HistoryEntry = {
        waktu: now,
        dari,
        ke,
        jumlah,
        hasil: result.hasil,
        kurs: result.kurs,
      }
      setHistory((prev) => [entry, ...prev].slice(0, 50))
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal melakukan konversi")
    } finally {
      setLoading(false)
    }
  }, [dari, ke, jumlah, setTotalKonversi, setHistory])

  const swapCurrencies = useCallback(() => {
    setDari(ke)
    setKe(dari)
    setHasil(null)
    setKurs(null)
    setError(null)
  }, [dari, ke])

  const addFavorite = useCallback(() => {
    const pair: [string, string] = [dari, ke]
    setFavorites((prev) => {
      if (prev.some(([a, b]) => a === pair[0] && b === pair[1])) return prev
      return [...prev, pair]
    })
  }, [dari, ke, setFavorites])

  const removeFavorite = useCallback(
    (pair: [string, string]) => {
      setFavorites((prev) => prev.filter(([a, b]) => a !== pair[0] || b !== pair[1]))
    },
    [setFavorites]
  )

  const loadFavorite = useCallback((pair: [string, string]) => {
    setDari(pair[0])
    setKe(pair[1])
    setHasil(null)
    setKurs(null)
    setError(null)
  }, [])

  const reset = useCallback(() => {
    setDari("USD")
    setKe("IDR")
    setJumlah(1)
    setHasil(null)
    setKurs(null)
    setInverse(null)
    setError(null)
    setWaktuUpdate(null)
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [setHistory])

  const currencyList = CURRENCY_CODES.map((code) => ({
    code,
    name: CURRENCIES[code].name,
    flag: CURRENCIES[code].flag,
    symbol: CURRENCIES[code].symbol,
  }))

  return {
    dari,
    ke,
    jumlah,
    hasil,
    kurs,
    inverse,
    loading,
    error,
    waktuUpdate,
    totalKonversi,
    history,
    favorites,
    currencyList,
    setDari,
    setKe,
    setJumlah,
    doConvert,
    swapCurrencies,
    addFavorite,
    removeFavorite,
    loadFavorite,
    reset,
    clearHistory,
  }
}
