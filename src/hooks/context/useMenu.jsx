import { useState, createContext, useContext, useEffect } from "react"

const MenuStore = createContext(null)





export const MenuProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState()

  const handleItem = (item) => {
    setSelectedItem(item)
  }

  useEffect(() => {
    handleItem("home")
  }, [])


  return (
    <MenuStore.Provider value={{
      selectedItem,
      handleItem,
    }}>
      {children}
    </MenuStore.Provider>
  )
}

export function useLanguage() {
  return useContext(MenuStore)
}
