import { useState, createContext, useContext, useEffect } from "react"

const MenuStore = createContext(null)





export const MenuProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState("home")

  const handleItem = (item) => {
    console.log(selectedItem + " : " + item)
    if (selectedItem !== item) {

      setSelectedItem(item)
    }

  }

  return (
    <MenuStore.Provider value={{
      selectedItem,
      handleItem,
      setSelectedItem,
    }}>
      {children}
    </MenuStore.Provider>
  )
}

export function useMenu() {
  return useContext(MenuStore)
}
