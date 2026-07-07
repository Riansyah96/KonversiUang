import { API_BASE } from "./constants"

export interface RateResponse {
  amount: number
  base: string
  date: string
  rates: Record<string, number>
}

export async function getLatestRates(base: string = "USD"): Promise<RateResponse> {
  const res = await fetch(`${API_BASE}/latest?base=${base}`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error(`Gagal mendapatkan kurs: ${res.statusText}`)
  return res.json()
}

export async function convertCurrency(
  dari: string,
  ke: string,
  jumlah: number
): Promise<{ hasil: number; kurs: number; inverse: number }> {
  const data = await getLatestRates(dari)
  const kurs = data.rates[ke]
  if (!kurs) throw new Error(`Kurs untuk ${ke} tidak ditemukan`)
  const hasil = jumlah * kurs
  return { hasil, kurs, inverse: 1 / kurs }
}

export async function getRate(base: string, target: string): Promise<number> {
  const data = await getLatestRates(base)
  const rate = data.rates[target]
  if (!rate) throw new Error(`Kurs untuk ${target} tidak ditemukan`)
  return rate
}
