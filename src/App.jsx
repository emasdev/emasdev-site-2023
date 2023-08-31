import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'animate.css';
import './App.css'

import Banner from './components/Banner';
import Header from './components/Header'


import Services from './components/Technologies';
import { LanguageProvider } from './hooks/context/useLanguage';
import Products from "./components/Products";
import { MenuProvider } from "./hooks/context/useMenu";
import { Contact } from "./components/Contact";

const App = () => {

  return (
    <div className='App'>
      <LanguageProvider>
        <MenuProvider>
          <Header />
          <Banner />
          <Services />
          <Products />
          <Contact />
        </MenuProvider>
      </LanguageProvider>
    </div>
  )
}

export default App
