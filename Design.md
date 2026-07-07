# Design Documentation — Game Center

> **Tujuan**: Dokumen ini mendokumentasikan seluruh keputusan desain, sistem komponen, tata letak, dan pola arsitektur yang digunakan pada proyek Game Center. Dapat digunakan sebagai acuan untuk proyek front-end lainnya.

---

## Daftar Isi

1. [Design System](#1-design-system)
2. [Layout & Responsive](#2-layout--responsive)
3. [Komponen UI](#3-komponen-ui)
4. [Halaman & Routing](#4-halaman--routing)
5. [Game Architecture](#5-game-architecture)
6. [Data Flow & State Management](#6-data-flow--state-management)
7. [Tema & Dark Mode](#7-tema--dark-mode)
8. [Animasi & Transisi](#8-animasi--transisi)
9. [Pola & Best Practices](#9-pola--best-practices)
10. [Bento Grid Pattern](#10-bento-grid-pattern)

---

## 1. Design System

### 1.1 Filosofi

Desain mengusung pendekatan **utility-first** dengan Tailwind CSS v4. Tidak ada library UI eksternal; seluruh komponen dibuat custom berbasis Tailwind utility classes. Warna menggunakan palet kustom yang didefinisikan di `globals.css` melalui directive `@theme`.

### 1.2 Color Palette

Semua warna didefinisikan di `src/app/globals.css` dalam blok `@theme`:

```css
@theme {
  /* Primary — indigo (navigasi, CTA, elemen aktif) */
  --color-primary-50: #eef2ff;
  --color-primary-100: #e0e7ff;
  --color-primary-200: #c7d2fe;
  --color-primary-300: #a5b4fc;
  --color-primary-400: #818cf8;
  --color-primary-500: #6366f1;
  --color-primary-600: #4f46e5;
  --color-primary-700: #4338ca;
  --color-primary-800: #3730a3;
  --color-primary-900: #312e81;

  /* Surface — slate (latar, kartu, teks) */
  --color-surface-50: #f8fafc;
  --color-surface-100: #f1f5f9;
  --color-surface-200: #e2e8f0;
  --color-surface-300: #cbd5e1;
  --color-surface-400: #94a3b8;
  --color-surface-500: #64748b;
  --color-surface-600: #475569;
  --color-surface-700: #334155;
  --color-surface-800: #1e293b;
  --color-surface-900: #0f172a;
  --color-surface-950: #020617;

  /* Accent — emerald (sukses, positif) */
  --color-accent-50: #ecfdf5;
  --color-accent-500: #10b981;
  --color-accent-900: #064e3b;

  /* Danger — red (error, destruktif) */
  --color-danger-50: #fef2f2;
  --color-danger-500: #ef4444;
  --color-danger-900: #7f1d1d;

  /* Warning — amber (peringatan) */
  --color-warning-50: #fffbeb;
  --color-warning-500: #f59e0b;
  --color-warning-900: #78350f;
}
```

**Aturan penggunaan warna:**

| Token | Penggunaan |
|-------|------------|
| `primary-*` | Tombol utama, link, border fokus, sidebar aktif, gradient header |
| `surface-*` | Background halaman (`surface-900` dark / `surface-50` light), kartu (`surface-800` dark / `white` light), teks judul (`white`/`surface-900`), teks body (`surface-400`/`surface-500`) |
| `accent-*` | Indikator sukses, badge positif, stat positif |
| `danger-*` | Error, nyawa habis, badge negatif |
| `warning-*` | Peringatan, badge medium |

### 1.3 Tipografi

- **Font family**: Sistem default (Tailwind `font-sans`) — tidak ada custom font yang di-load.
- **Skala tipografi**:

| Kelas | Ukuran | Penggunaan |
|-------|--------|------------|
| `text-xs` | 12px | Label, badge, copyright footer |
| `text-sm` | 14px | Body text, deskripsi kartu |
| `text-base` | 16px | Paragraf utama |
| `text-lg` | 18px | Subheading |
| `text-xl` | 20px | Section title |
| `text-2xl` | 24px | Halaman judul |
| `text-3xl` | 30px | Hero heading (mobile) |
| `text-4xl` | 36px | Hero heading (desktop) |

### 1.4 Spacing

Menggunakan skala spacing Tailwind default:
- `gap-4` (16px) untuk grid items
- `space-y-8` (32px) untuk jarak antar section
- `p-8` (32px) padding hero, `sm:p-12` (48px) di desktop
- `px-3 py-1.5` untuk badge (12px horizontal, 6px vertical)

### 1.5 Border Radius

| Kelas | Nilai | Penggunaan |
|-------|-------|------------|
| `rounded-xl` | 12px | Card, icon container |
| `rounded-2xl` | 16px | Icon container large |
| `rounded-lg` | 8px | Input, button |

### 1.6 Shadow & Ring

- Kartu menggunakan border (`border border-surface-200/60 dark:border-surface-700/60`)
- Hover state: `hover:border-primary-200 dark:hover:border-primary-800`
- Tidak menggunakan `box-shadow`; semua depth diekspresikan via border dan background.

---

## 2. Layout & Responsive

### 2.1 App Shell Architecture

```
┌─────────────────────────────────┐
│ SIDEBAR (fixed, lg+)            │
│ ┌───┐ ┌─────────────────────┐  │
│ │   │ │ MOBILE HEADER (sm)  │  │
│ │ N │ ├─────────────────────┤  │
│ │ A │ │                     │  │
│ │ V │ │ MAIN CONTENT        │  │
│ │   │ │ (overflow-y-auto)   │  │
│ │   │ │                     │  │
│ │   │ ├─────────────────────┤  │
│ │   │ │ FOOTER (sticky)    │  │
│ └───┘ └─────────────────────┘  │
└─────────────────────────────────┘
```

**Breakpoints yang digunakan:**

| Tailwind | Lebar | Target |
|----------|-------|--------|
| `sm` | 640px+ | Mobile landscape, tablet kecil |
| `md` | 768px+ | Tablet, grid 2 kolom |
| `lg` | 1024px+ | Desktop, sidebar muncul, grid 3-4 kolom |
| `(default)` | < 640px | Mobile portrait |

### 2.2 Sidebar

- **Desktop (lg+)**: Fixed di kiri, lebar 64px (icon-only) atau 240px (expanded).
- **Mobile (< lg)**: Hidden, digantikan oleh MobileNav.
- **Nav items**: Beranda, Dashboard, Games, Tentang Developer.
- **Active state**: Item aktif di-highlight dengan `bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400`.

### 2.3 Mobile Navigation

- Hanya muncul di < lg.
- Tombol hamburger membuka sidebar sebagai overlay.

### 2.4 Responsive Grid Strategy

Menggunakan grid responsif dengan kolom berbeda tiap breakpoint.

---

## 3. Komponen UI

### 3.1 Card

Komponen paling sering digunakan. Props: `children`, `className`, `hover`, `onClick`.

### 3.2 Badge

Variant: `default`, `success`, `danger`, `warning`, `info`, `primary`.

### 3.3 StatCard

Menampilkan icon, label, dan value dalam layout horizontal.

### 3.4 ThemeToggle

Membaca/menulis localStorage, men-toggle class `.dark` pada `<html>`.

---

## 4. Halaman & Routing

```
/                          → Landing (page.tsx)
/about                     → Info developer
```

---

## 5. Tema & Dark Mode

### 5.1 Strategi

Menggunakan **class-based dark mode** (bukan `prefers-color-scheme`):

```css
@custom-variant dark (&:is(.dark *));
```

- Default: Light mode.
- Jika `localStorage.theme === 'dark'`: tambahkan class `.dark` ke `<html>`.
- Toggle: `ThemeToggle` component.

### 5.2 Dark Mode Guidelines

Semua warna didefinisikan dengan pasangan light/dark menggunakan `dark:` prefix.

---

## 6. Animasi & Transisi

### 6.1 Custom Keyframes

```css
@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
```

### 6.2 Pola Animasi

Card hover menggunakan `group-hover` pattern dengan overlay gradient dan arrow icon geser.

---

## 7. Pola & Best Practices

### 7.1 Component Patterns

1. **`cn()` utility** untuk className merging
2. **Composition over configuration**
3. **Client components** untuk interaktivitas

### 7.2 Imports Order

1. React / Next.js
2. Heroicons
3. Komponen internal
4. Hooks
5. Lib/utils
6. Types

---

## 8. Bento Grid Pattern

### 8.1 Konsep

Landing page menggunakan **bento grid** — grid asimetris di mana item memiliki ukuran kolom berbeda untuk menciptakan variasi visual.

### 8.2 Implementasi

Grid 4 kolom (desktop), 2 kolom (tablet), 1 kolom (mobile).

### 8.3 Aturan Bento Grid

1. **Total kolom harus pas**: Setiap baris harus tepat terisi.
2. **Item hero (2 kolom)**: Sisakan item 1 kolom di sampingnya.
3. **Responsif**: Setiap breakpoint punya tata letak sendiri.
4. **Tidak ada row-span**: Semua item dalam 1 baris.
5. **Gap seragam**: `gap-4`.

---

## Lampiran

### A. Command Reference

```bash
npm run dev
npm run build
npm run lint
```

### B. Dependencies

| Package | Versi |
|---------|-------|
| next | ^15.3.1 |
| react | ^19.1.0 |
| react-dom | ^19.1.0 |
| @heroicons/react | ^2.2.0 |
| tailwindcss | ^4.1.4 |
| typescript | ^5.8.3 |

---

*Dokumen ini digunakan sebagai referensi desain untuk proyek KonversiUang.*
