import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { LanguageProvider } from '@/contexts/LanguageContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: {
    default: 'PrimeCred — Crédito rápido e seguro',
    template: '%s | PrimeCred',
  },
  description:
    'PrimeCred oferece empréstimo pessoal, crédito consignado, refinanciamento e antecipação de FGTS com aprovação rápida e as melhores taxas do mercado.',
  keywords: ['crédito', 'empréstimo', 'consignado', 'FGTS', 'refinanciamento', 'PrimeCred'],
  openGraph: {
    title: 'PrimeCred — Crédito rápido e seguro',
    description: 'Aprovação em 24h. Sem burocracia. Melhores taxas do mercado.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased bg-slate-950`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
