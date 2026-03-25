import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "animate.css";
import "./App.css";

import Banner from "./components/Banner";
import Header from "./components/Header";

import Services from "./components/Technologies";
import { LanguageProvider } from "./hooks/context/useLanguage";
import Products from "./components/Products";
import { MenuProvider } from "./hooks/context/useMenu";
import { Contact } from "./components/Contact";
import Spec from "./components/Spec";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const Main = () => (
    <>
      <Header />
      <Banner />
      <Services />
      <Products />
      <Contact />
    </>
  );

  return (
    <div className="App">
      <LanguageProvider>
        <MenuProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/spec" element={<Spec />} />
            </Routes>
          </Router>
        </MenuProvider>
      </LanguageProvider>
    </div>
  );
};

export default App;
