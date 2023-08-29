import { useState, createContext, useContext, useEffect } from "react"

const LanguageStore = createContext(null)

const spanishTexts = {
  navigation: {
    item1: "Inicio",
    item2: "Tecnologías",
    item3: "Productos",
    spanishBtn: "español",
    englishBtn: "english",
  },
  banner: {
    text1: "Hola, Soy ",
    text2: "Programador fullstack que crea aplicaciones web y móbiles",
    tags: ["Desarrollador Web",
      "Desarrollador de aplicaciones móviles`",
      "Diseñador UI/UX",
      "Servicios web via REST (integración y deployment)",
    ],
    languageBtn: "Show in english",
    contactBtn: "Contáctame",
  },
  technologies: {
    text1: "Tecnologías"
  }

}

const englishTexts = {
  navigation: {
    item1: "Home",
    item2: "Technologies",
    item3: "Products",
    spanishBtn: "español",
    englishBtn: "english",
  },
  banner: {
    text1: "Hi, I'm ",
    text2: "Fullstack developer that creates web and mobile apps",
    tags: ["Web Developer",
      "Mobile Developer`",
      "UI/UX Designer",
      "Web Services via REST (development, integration)",
    ],
    languageBtn: "Ver en español",
    contactBtn: "Contact me",
  },
  technologies: {
    text1: "Technologies"
  }

}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("spanish")
  const [texts, setTexts] = useState(spanishTexts)



  const toggleLanguage = () => {
    if (language === "spanish") {
      setTexts(spanishTexts)
      setLanguage("english")
    } else if (language === "english") {
      setTexts(englishTexts)
      setLanguage("spanish")
    }

  }

  useEffect(() => {
    toggleLanguage(language)
  }, [])


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
