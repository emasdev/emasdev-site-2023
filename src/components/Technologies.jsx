import { Container, Row, Col } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import skill1 from "../assets/img/reactjs-icon.svg"
import skill2 from "../assets/img/firebase-icon.svg"
import colorSharp from "../assets/img/color-sharp.png"
import TrackVisibility from 'react-on-screen';
import { useLanguage } from '../hooks/context/useLanguage';


export const Technologies = () => {
  const { texts } = useLanguage()

  return (
    <section className='skill mx-4' id='technologies'>
      <Container className="skill-bx">
        <Row className='align-items-center p-4'>


          <div className={"animate__animated animate__pulse"}>
            <h2>
              {texts.technologies.text1}
            </h2>
            <p className='px-4'>Soy un desarrollador fullstack especializado en crear aplicaciones web y móbiles con React. Utilizo firebase para hospedarlas y agregar capas de servicios: autenticación de usuarios, base de datos, carrito de compras, agenda de eventos, o lo que el cliente necesite con la flexibilidad de una arquitectura de desarrollo adaptable y escalable.</p>
          </div>



          <Col xs={12} md={6}>

            <img src={skill1} alt="image" className='w-50  react-icon' />


          </Col>
          <Col xs={12} md={6} className='mt-4'>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__slideInRight" : ""}>
                  <h5>React development</h5>
                  <p>Utilizo esta libreria de herramientas para desarrollar la capa de presentación (frontend) de mis desarrollos, ya que React tiene la ventaja de ser multiplataforma, es similar el código empleado para hacer una página web que el utilizado en una aplicación móbil.</p>
                </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} className='order-md-4 mb-sm-4'>
            <img src={skill2} alt="image" className='w-50 firebase-icon' />
          </Col>
          <Col xs={12} md={6} className='order-md-3 mt-4' >
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__slideInLeft" : ""}>
                  <h5>Firebase integration</h5>
                  <p>Utilizo esta plataforma de desarrollo para darle a mis clientes la libertad de integrar capa por capa cualquier servicio ofrecido por firebase. Los más solicitados suelen ser: </p>
                  <ul>
                    <li>Hosting</li>
                    <li>Autentificación</li>
                    <li>Base de datos</li>
                    <li>Almacenamiento</li>
                  </ul>
                </div>}
            </TrackVisibility>
          </Col>
          {/* <div>
              <img src={skill1} alt="image" />
              <h5>React development</h5>
              <p>Utilizo esta libreria para desarrollar el frontend en plataformas web y mobiles.</p>
            </div>
            <div>
              <img src={skill2} alt="image" />
              <h5>Firebase integration</h5>
              <p>Utilizo esta plataforma de desarrollo para darle a mis clientes la libertad de integrar capa por capa cualquier servicio ofrecido por firebase. Los más solicitados suelen ser: </p>
              <ul>
                <li>Hosting</li>
                <li>Autentificación</li>
                <li>Base de datos</li>
                <li>Almacenamiento</li>
              </ul>
            </div> */}

        </Row>
      </Container>
      <img className='background-image-left' src={colorSharp} />
    </section>
  )
}

export default Technologies;