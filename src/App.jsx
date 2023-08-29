import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'animate.css';
import './App.css'

import Banner from './components/Banner';
import Navigation from './components/Navigation'


import Services from './components/Technologies';
import { LanguageProvider } from './hooks/context/useLanguage';
import Products from "./components/Products";
import { MenuProvider } from "./hooks/context/useMenu";

const App = () => {

  return (
    <div className='App'>
      <LanguageProvider>
        <MenuProvider>
          <Navigation />
          <Banner />
          <Services />
          <Products />
        </MenuProvider>
      </LanguageProvider>
    </div>
  )
}

export default App
