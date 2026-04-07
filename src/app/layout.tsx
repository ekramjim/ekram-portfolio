import { Manrope, Space_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/app/components/Layout/Header'
import Footer from '@/app/components/Layout/Footer'
import ScrollToTop from '@/app/components/ScrollToTop'
import BrutalCursor from '@/app/components/ui/BrutalCursor'
import ScrollProgress from '@/app/components/ui/ScrollProgress'
import Aoscompo from '@/utils/aos'
import { Providers } from './providers'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${manrope.variable} ${spaceMono.variable} font-heading bg-[var(--bg-primary)] text-[var(--text-primary)] brutal-grain`}>
        <ScrollProgress />
        <BrutalCursor />
        <Providers>
          <Aoscompo>
            <Header />
            {children}
            <Footer />
          </Aoscompo>
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  )
}
