# KonversiUang

Aplikasi konversi mata uang dunia dengan kurs real-time. Dibangun dengan Next.js 16 dan Tailwind CSS v4.

## Fitur

- Konversi 45+ mata uang dunia dengan kurs real-time (via [Frankfurter API](https://api.frankfurter.dev))
- Pencarian & filter mata uang
- Riwayat konversi (tersimpan di localStorage)
- Favorit pasangan mata uang
- Tabel kurs terkini untuk mata uang populer
- Tema gelap/terang
- Tampilan responsif (desktop & mobile)
- Halaman informasi developer bilingual (ID/EN)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS v4
- **Ikon:** @heroicons/react v2 (outline)
- **API Kurs:** Frankfurter API (gratis, tanpa API key)
- **Penyimpanan:** localStorage

## Memulai

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

### Build Produksi

```bash
npm run build
npm start
```

### Akses dari Perangkat Lain (Local Network)

```bash
npm run dev -- -H 0.0.0.0
```

Tambahkan IP perangkat ke `allowedDevOrigins` di `next.config.ts` jika diperlukan.

## Struktur Proyek

```
src/
├── app/                    # Halaman (App Router)
│   ├── about/              # Halaman developer
│   ├── globals.css         # Design system & tema
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Halaman utama konverter
├── components/
│   ├── converter/          # Komponen fitur konversi
│   ├── developer/          # Komponen profil developer
│   ├── layout/             # AppShell, Sidebar, MobileNav
│   └── ui/                 # Design system (Card, Badge, StatCard, dll)
├── hooks/                  # Custom hooks
├── lib/                    # Utilitas, API client, konstanta
└── types/                  # TypeScript types
```

## Developer

**Arief Rachman Apriansyah**
- Email: rianscollege@gmail.com
- GitHub: [@Riansyah96](https://github.com/Riansyah96)
