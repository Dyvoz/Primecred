'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { t, Lang } from '@/lib/i18n'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  T: typeof t[Lang]
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'pt',
  setLang: () => {},
  T: t.pt,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('pt')

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved === 'pt' || saved === 'en') setLangState(saved)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('lang', l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, T: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
