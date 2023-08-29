import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/img/logo-no-background.svg';
import { useLanguage } from '../hooks/context/useLanguage';
import { Translate } from 'react-bootstrap-icons';

function Navigation() {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, seScrolled] = useState(false);
  const { language, texts, toggleLanguage } = useLanguage()

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        seScrolled(true);
      } else {
        seScrolled(false);
      }
    }
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])
  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }
  return (
    <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt='Logo' className={scrolled ? "logo-scrolled" : ""} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className='navbar-toggler-icon'></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end align-items-center'>
          <Nav className='text-align-end'>
            <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>{texts.navigation.item1}</Nav.Link>
            <Nav.Link href="#technologies" className={activeLink === 'technologies' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('technologies')}>{texts.navigation.item2}</Nav.Link>
            <Nav.Link href="#products" className={activeLink === 'products' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('products')}>{texts.navigation.item3}</Nav.Link>
            <Nav.Item>
              <div className='language'>
                <span className='px-2'><Translate size={17} /></span>

                <div
                  onClick={() => {
                    if (language === "spanish") {
                      toggleLanguage()
                    }


                  }}
                  className={language === 'spanish' ?
                    'navbar-link pointer' :
                    'navbar-link'}>
                  {texts.navigation.spanishBtn}
                </div>
                <span className='px-2'> | </span>
                <div
                  onClick={() => {
                    if (language === "english") {
                      toggleLanguage()
                    }


                  }}
                  className={language === 'english' ?
                    'navbar-link pointer' :
                    'navbar-link'}>
                  {texts.navigation.englishBtn}
                </div>
              </div>
            </Nav.Item>





          </Nav>
          {/* <span className="navbar-text">
            <button className="vvd" onClick={() => console.log('connect')}><span>Let's Connect</span></button>
          </span> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;