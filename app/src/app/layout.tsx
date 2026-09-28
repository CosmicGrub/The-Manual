import './globals.css'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { RegisterServiceWorker } from '@/components/RegisterServiceWorker'

export const metadata: Metadata = {
  title: 'The Manual',
  description: 'A self-taught, multi-tier coding, hardware, and AI curriculum.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'The Manual',
  },
}

// Separate from `metadata` per Next.js App Router convention (themeColor/viewport
// warn if left inside `metadata`). `viewportFit: 'cover'` plus the safe-area CSS in
// globals.css is what keeps content clear of a foldable's hinge/notch and a phone's
// system bars — see docs/running-on-your-devices.md for the devices this targets.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <div className="max-w-5xl mx-auto p-4 sm:p-6" style={{ paddingLeft: 'max(1rem, env(safe-area-inset-left))', paddingRight: 'max(1rem, env(safe-area-inset-right))' }}>
          {children}
        </div>
        <RegisterServiceWorker />
      </body>
    </html>
  )
}
