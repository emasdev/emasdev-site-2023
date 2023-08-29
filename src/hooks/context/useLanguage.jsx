import { useState, createContext, useContext, useEffect } from "react"
import { SpanishTexts } from "../../content/spanish"
import { EnglishTexts } from "../../content/english"

const LanguageStore = createContext(null)


export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("spanish")
  const [texts, setTexts] = useState(SpanishTexts)



  const toggleLanguage = () => {
    if (language === "spanish") {
      setTexts(SpanishTexts)
      setLanguage("english")
    } else if (language === "english") {
      setTexts(EnglishTexts)
      setLanguage("spanish")
    }

  }


  return (
    <LanguageStore.Provider value={{
      texts,
      language,
      toggleLanguage,
    }}>
      {children}
    </LanguageStore.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageStore)
}
