export interface CurrencyInfo {
  code: string
  name: string
  symbol: string
  country: string
  flag: string
}

export interface ConversionResult {
  dari: string
  ke: string
  jumlah: number
  hasil: number
  kurs: number
  inverse: number
  waktu: string
}

export interface HistoryEntry {
  waktu: string
  dari: string
  ke: string
  jumlah: number
  hasil: number
  kurs: number
}

export interface ConverterState {
  dari: string
  ke: string
  jumlah: number
  hasil: number | null
  kursTerakhir: { kurs: number; inverse: number } | null
  waktuUpdate: string | null
  totalKonversi: number
}

export interface StatsData {
  totalKonversi: number
  totalFavorit: number
  lastUpdate: string | null
  uniquePairs: number
}
