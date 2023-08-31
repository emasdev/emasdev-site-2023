import { Container, Row, Col } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import technology1 from "../assets/img/reactjs-icon.svg"
import technology2 from "../assets/img/firebase-icon.svg"
import colorSharp from "../assets/img/color-sharp.png"
import TrackVisibility from 'react-on-screen';
import { useLanguage } from '../hooks/context/useLanguage';
import { useEffect, useRef } from 'react';
import { useMenu } from '../hooks/context/useMenu';


export const Technologies = () => {
  const { texts } = useLanguage()
  const { setSelectedItem } = useMenu()

  return (
    <section className='technology' id='technologies'>

      <Container className="technology-bx">
        <Row className='align-items-center mx-sm-4 p-4'>

          <TrackVisibility>
            {({ isVisible }) => {
              if (isVisible) {
                setSelectedItem("technologies")
              }
              return (
                <div className={isVisible ? "animate__animated animate__pulse" : ""}>
                  <h2 className='mb-4'>
                    {texts.technologies.text1}
                  </h2>
                  <p className='p-4'>{texts.technologies.text2}</p>
                </div>
              )
            }}
          </TrackVisibility>



          <Col xs={12} md={6}>

            <img src={technology1} alt="image" className='w-50 my-4 react-icon' />


          </Col>
          <Col xs={12} md={6} className='my-4'>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__pulse" : ""}>
                  <h5 className='my-4'>React</h5>
                  <p>{texts.technologies.react}</p>
                </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} className='order-md-4 mb-sm-4'>
            <img src={technology2} alt="image" className='w-50 my-4 firebase-icon' />
          </Col>
          <Col xs={12} md={6} className='order-md-3 mt-4' >
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__pulse" : ""}>
                  <h5 className='mb-4'>Firebase</h5>
                  <p className='mb-4'>{texts.technologies.firebase.text}</p>
                  <ul>
                    {texts.technologies.firebase.tags.map((item) => {
                      return <li key={item}>{item}</li>
                    })}
                  </ul>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>

      <img className='background-image-left' src={colorSharp} />
    </section>
  )
}

export default Technologies;