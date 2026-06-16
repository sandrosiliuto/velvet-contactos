import './globals.css'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'La verbena cosmica_match ✨',
  description: 'Conoce gente en La Verbena Cósmica — swipe, match, WhatsApp',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#0a0a1a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-[#0a0a1a] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
