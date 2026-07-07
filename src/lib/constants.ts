import type { CurrencyInfo } from "@/types"

export const CURRENCIES: Record<string, CurrencyInfo> = {
  USD: { code: "USD", name: "US Dollar", symbol: "$", country: "United States", flag: "🇺🇸" },
  EUR: { code: "EUR", name: "Euro", symbol: "€", country: "European Union", flag: "🇪🇺" },
  GBP: { code: "GBP", name: "British Pound", symbol: "£", country: "United Kingdom", flag: "🇬🇧" },
  JPY: { code: "JPY", name: "Japanese Yen", symbol: "¥", country: "Japan", flag: "🇯🇵" },
  AUD: { code: "AUD", name: "Australian Dollar", symbol: "A$", country: "Australia", flag: "🇦🇺" },
  CAD: { code: "CAD", name: "Canadian Dollar", symbol: "C$", country: "Canada", flag: "🇨🇦" },
  CHF: { code: "CHF", name: "Swiss Franc", symbol: "CHF", country: "Switzerland", flag: "🇨🇭" },
  CNY: { code: "CNY", name: "Chinese Yuan", symbol: "¥", country: "China", flag: "🇨🇳" },
  IDR: { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", country: "Indonesia", flag: "🇮🇩" },
  INR: { code: "INR", name: "Indian Rupee", symbol: "₹", country: "India", flag: "🇮🇳" },
  SGD: { code: "SGD", name: "Singapore Dollar", symbol: "S$", country: "Singapore", flag: "🇸🇬" },
  MYR: { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", country: "Malaysia", flag: "🇲🇾" },
  THB: { code: "THB", name: "Thai Baht", symbol: "฿", country: "Thailand", flag: "🇹🇭" },
  KRW: { code: "KRW", name: "South Korean Won", symbol: "₩", country: "South Korea", flag: "🇰🇷" },
  AED: { code: "AED", name: "UAE Dirham", symbol: "د.إ", country: "United Arab Emirates", flag: "🇦🇪" },
  SAR: { code: "SAR", name: "Saudi Riyal", symbol: "﷼", country: "Saudi Arabia", flag: "🇸🇦" },
  BRL: { code: "BRL", name: "Brazilian Real", symbol: "R$", country: "Brazil", flag: "🇧🇷" },
  MXN: { code: "MXN", name: "Mexican Peso", symbol: "Mex$", country: "Mexico", flag: "🇲🇽" },
  RUB: { code: "RUB", name: "Russian Ruble", symbol: "₽", country: "Russia", flag: "🇷🇺" },
  ZAR: { code: "ZAR", name: "South African Rand", symbol: "R", country: "South Africa", flag: "🇿🇦" },
  TRY: { code: "TRY", name: "Turkish Lira", symbol: "₺", country: "Turkey", flag: "🇹🇷" },
  SEK: { code: "SEK", name: "Swedish Krona", symbol: "kr", country: "Sweden", flag: "🇸🇪" },
  NOK: { code: "NOK", name: "Norwegian Krone", symbol: "kr", country: "Norway", flag: "🇳🇴" },
  DKK: { code: "DKK", name: "Danish Krone", symbol: "kr", country: "Denmark", flag: "🇩🇰" },
  HKD: { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", country: "Hong Kong", flag: "🇭🇰" },
  NZD: { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", country: "New Zealand", flag: "🇳🇿" },
  PHP: { code: "PHP", name: "Philippine Peso", symbol: "₱", country: "Philippines", flag: "🇵🇭" },
  VND: { code: "VND", name: "Vietnamese Dong", symbol: "₫", country: "Vietnam", flag: "🇻🇳" },
  BDT: { code: "BDT", name: "Bangladeshi Taka", symbol: "৳", country: "Bangladesh", flag: "🇧🇩" },
  PKR: { code: "PKR", name: "Pakistani Rupee", symbol: "₨", country: "Pakistan", flag: "🇵🇰" },
  EGP: { code: "EGP", name: "Egyptian Pound", symbol: "E£", country: "Egypt", flag: "🇪🇬" },
  PLN: { code: "PLN", name: "Polish Zloty", symbol: "zł", country: "Poland", flag: "🇵🇱" },
  HUF: { code: "HUF", name: "Hungarian Forint", symbol: "Ft", country: "Hungary", flag: "🇭🇺" },
  CZK: { code: "CZK", name: "Czech Koruna", symbol: "Kč", country: "Czech Republic", flag: "🇨🇿" },
  RON: { code: "RON", name: "Romanian Leu", symbol: "lei", country: "Romania", flag: "🇷🇴" },
  ILS: { code: "ILS", name: "Israeli Shekel", symbol: "₪", country: "Israel", flag: "🇮🇱" },
  CLP: { code: "CLP", name: "Chilean Peso", symbol: "CLP$", country: "Chile", flag: "🇨🇱" },
  COP: { code: "COP", name: "Colombian Peso", symbol: "COL$", country: "Colombia", flag: "🇨🇴" },
  ARS: { code: "ARS", name: "Argentine Peso", symbol: "AR$", country: "Argentina", flag: "🇦🇷" },
  PEN: { code: "PEN", name: "Peruvian Sol", symbol: "S/", country: "Peru", flag: "🇵🇪" },
  KWD: { code: "KWD", name: "Kuwaiti Dinar", symbol: "KD", country: "Kuwait", flag: "🇰🇼" },
  QAR: { code: "QAR", name: "Qatari Riyal", symbol: "QR", country: "Qatar", flag: "🇶🇦" },
  OMR: { code: "OMR", name: "Omani Rial", symbol: "OMR", country: "Oman", flag: "🇴🇲" },
  BHD: { code: "BHD", name: "Bahraini Dinar", symbol: "BD", country: "Bahrain", flag: "🇧🇭" },
}

export const CURRENCY_CODES = Object.keys(CURRENCIES)

export const POPULAR_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "SGD", "IDR", "CNY", "KRW"]

export const API_BASE = "https://api.frankfurter.dev"

export const APP_NAME = "KonversiUang"
export const APP_DESC = "Aplikasi konversi mata uang dunia dengan kurs real-time"
