import { Container, Row, Col } from 'react-bootstrap';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp2.png"
import TrackVisibility from 'react-on-screen';
import { useLanguage } from '../hooks/context/useLanguage';
import { useEffect, useRef } from 'react';
import productImg1 from "../assets/img/Portfolio-website.svg"
import productImg2 from "../assets/img/Web-shopping.svg"
import { useMenu } from '../hooks/context/useMenu';



export const Products = () => {
  const { texts } = useLanguage()
  const { setSelectedItem } = useMenu()

  return (
    <section className='products p-4' id='products'>
      <TrackVisibility>
        {({ isVisible }) => {
          if (isVisible) {
            setSelectedItem("products")
          }
        }}
      </TrackVisibility>
      <Container className="">

        <Row className='p-4 p-md-0'>
          <Col xs={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                  <div className='d-flex justify-content-center'>
                    <h2 className='mb-4'>
                      {texts.products.text1}
                    </h2>
                  </div>
                </div>}
            </TrackVisibility>


          </Col>

          <Col xs={12} md={6} className='product py-3'>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__slideInLeft" : ""}>


                  <h5>
                    {texts.products.web.title}
                  </h5>
                  <p className='my-4'>
                    {texts.products.web.text}
                  </p>
                </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} className='product py-3 mt-3'>
            <TrackVisibility>
              {({ isVisible }) =>
                <img src={productImg1}
                  className={isVisible ? "animate__animated animate__pulse" : ""}
                  alt="header img" />
              }
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} className='product  py-3 mt-3 order-md-4'>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__slideInRight" : ""}>


                  <h5>
                    {texts.products.mobile.title}
                  </h5>
                  <p className='my-4'>
                    {texts.products.mobile.text}
                  </p>
                </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} className='product order-md-3'>
            <TrackVisibility>
              {({ isVisible }) =>
                <img src={productImg2}
                  className={isVisible ? "animate__animated animate__pulse" : ""}
                  alt="header img" />
              }
            </TrackVisibility>
          </Col>


        </Row>
      </Container>
      {/* <img className='background-image-left' src={colorSharp} /> */}
    </section>
  )
}

export default Products;