import { useState, createContext, useContext, useEffect } from "react"

const MenuStore = createContext(null)





export const MenuProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState("home")

  // useEffect(() => {
  //   setSelectedItem("Home")
  // }, [])


  return (
    <MenuStore.Provider value={{
      selectedItem,
      setSelectedItem,
    }}>
      {children}
    </MenuStore.Provider>
  )
}

export function useMenu() {
  return useContext(MenuStore)
}
