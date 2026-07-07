import type { Metadata } from "next"
import { ThemeProvider } from "@/components/ui/ThemeProvider"
import { AppShell } from "@/components/layout/AppShell"
import { APP_NAME, APP_DESC } from "@/lib/constants"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} - ${APP_DESC}`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESC,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('konversiuang_theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  )
}
