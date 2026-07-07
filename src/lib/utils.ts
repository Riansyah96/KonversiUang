export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}

export function formatCurrency(amount: number, currency: string, locale = "id-ID"): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch {
    return `${amount.toFixed(2)} ${currency}`
  }
}

export function formatNumber(amount: number, locale = "id-ID"): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(amount)
}

export function getCurrentTime(timezone = "Asia/Jakarta"): string {
  try {
    return new Date().toLocaleString("id-ID", {
      timeZone: timezone,
      dateStyle: "full",
      timeStyle: "medium",
    })
  } catch {
    return new Date().toLocaleString("id-ID")
  }
}
