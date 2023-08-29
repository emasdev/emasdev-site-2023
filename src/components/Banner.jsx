import { useState, useEffect } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { ArrowRightCircle } from "react-bootstrap-icons"
import headerImg from "../assets/img/Developer-activity.svg"
import 'animate.css'
import TrackVisibility from "react-on-screen"
import { useLanguage } from "../hooks/context/useLanguage"


export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const { texts, language, toggleLanguage } = useLanguage()

  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta)
    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % texts.banner.tags.length;
    let fullText = texts.banner.tags[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1)

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2)
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  }
  return (
    <section className="banner px-4" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__pulse" : ""}>

                  <h1>{texts.banner.text1}<span className="wrap name">Emanuel</span>{'\n'}</h1>
                  <span className="wrap text">{text}</span>
                  <button onClick={() => {

                    toggleLanguage()


                  }}>
                    {texts.banner.languageBtn}<ArrowRightCircle size={25} /></button>
                  <p className="mt-4">{texts.banner.text2}</p>
                  <button onClick={() => console.log('connect')}>{texts.banner.contactBtn} <ArrowRightCircle size={25} /></button>
                </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5} className="mt-4">
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__pulse" : ""}>
                  <img src={headerImg} alt="header img" />
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Banner;