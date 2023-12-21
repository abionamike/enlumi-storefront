import './globals.css'
import AppLayout from "@/components/AppLayout"
import { Open_Sans } from 'next/font/google'

const open_sans = Open_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
  variable: '--font-open_sans', 
});

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${open_sans.variable}`}>
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  )
}
