import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../translations/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  // Default to Hebrew as requested by user
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('procut_lang') || 'he'
  })

  const t = translations[lang] || translations.he

  useEffect(() => {
    localStorage.setItem('procut_lang', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = t.dir
  }, [lang, t.dir])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir: t.dir }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
