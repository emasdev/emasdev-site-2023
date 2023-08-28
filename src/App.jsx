import './App.css'
import Banner from './components/Banner';
import Navigation from './components/Navigation'
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'animate.css';
import Services from './components/Services';

const App = () => {

  return (
    <div className='App'>
      <Navigation />
      <Banner />
      <Services />
    </div>
  )
}

export default App
