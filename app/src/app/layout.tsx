import './globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'The Manual',
  description: 'A self-taught, multi-tier coding, hardware, and AI curriculum.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <div className="max-w-5xl mx-auto p-6">{children}</div>
      </body>
    </html>
  )
}
