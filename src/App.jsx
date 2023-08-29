import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'animate.css';
import './App.css'

import Banner from './components/Banner';
import Navigation from './components/Navigation'


import Services from './components/Technologies';
import { LanguageProvider } from './hooks/context/useLanguage';

const App = () => {

  return (
    <div className='App'>
      <LanguageProvider>
        <Navigation />
        <Banner />
        <Services />
      </LanguageProvider>
    </div>
  )
}

export default App
