import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useLanguage } from "../hooks/context/useLanguage";
import TrackVisibility from "react-on-screen";
import { EnvelopeAtFill } from "react-bootstrap-icons"
import { useMenu } from "../hooks/context/useMenu";


export const Contact = () => {

  const { texts } = useLanguage()
  const { setSelectedItem } = useMenu()


  const formInitialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const onFormUpdate = (catagory, value) => {
    setFormDetails({
      ...formDetails,
      [catagory]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefualt();
    setButtonText("Sending...");
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json;charset=utf-8",
      },
      body: JSON.stringify(formDetails),
    });
    setButtonText("Send");
    let result = response.json();
    setFormDetails(formInitialDetails);
    if (result.code === 200) {
      setStatus({ success: true, message: "Message sent already" });
    } else {
      setStatus({
        success: false,
        message: "Something went wrong, please send this again later.",
      });
    }
  };

  // console.log(import.meta.env.VITE_SOME_KEY)

  return (
    <section className="contact py-4" id="contact">
      <TrackVisibility>
        {({ isVisible }) => {
          if (isVisible) {
            setSelectedItem("contact")
          }
        }}
      </TrackVisibility>
      <Container>
        <Row className="align-items-center my-4">
          <Col xs={12}>
            <h2 className="text-center mb-4">{texts.contact.text1}</h2>
          </Col>
          <Col xs={12} md={6}>

            <div className={"animate__animated animate__pulse"}>
              <p>{texts.contact.text4}</p>
              <p className="my-4">{texts.contact.text2}</p>
              <p>{texts.contact.text3}</p>
            </div>

          </Col>
          <Col xs={12} md={6}>
            <div>
              <EnvelopeAtFill size={15} className="mr-4" /><span className="info">emas.dev@gmail.com</span>
            </div>

            {/* <Form className="my-3">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Mensaje</Form.Label>
                      <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Enviar mensaje
                    </Button>
                  </Form> */}
          </Col>
        </Row>



      </Container>
    </section>
  );
};
