import React, { useState, useEffect } from 'react'
import "bootstrap-icons/font/bootstrap-icons.css";
import * as yup from "yup";
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import lineimg from "../images/lineimg.png"
import waveimg from "../images/waveimg.png"
import InputGroupText from 'react-bootstrap/esm/InputGroupText';

function Loginpage() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    pass: ""
  })
  const [match] = useState({
    name: "Login",
    password: "Login@123"
  })
  useEffect(() => {
    if (input.name === match.name && input.password === match.pass) {
      navigate('/submit');
    }
  }, [input]);
  const handleSubmit = (values, { resetForm }) => {
    setInput(values);
    sessionStorage.setItem("username", values.name)
    console.log(values.name)
    console.log(`Values are :`, values);
    resetForm();
  }
  const Schema = yup.object().shape({
    name: yup.string().required("name is required"),
    pass: yup.string().required("Password is required")
  })
  return (
    <div style={{ backgroundImage: `url(${lineimg})` }} className='login_backgroundimg'>
      <Row>
        <Col md="3"></Col>
        <Col md="6">
          <Card className='card1'>
            <Card.Body style={{ backgroundImage: `url(${waveimg})` }}>
              <Formik
                validationSchema={Schema}
                onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                initialValues=
                {
                  {
                    name: '',     
                    pass: ''
                  }
                }
              >{({ handleSubmit, handleChange, values, errors }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formName">
                    <Form.Label className='a1'>Enter User Name</Form.Label>
                    <InputGroup><InputGroupText className='user_icon'><i class="bi bi-person-circle"></i></InputGroupText>

                      <Form.Control
                        className='formcontrol'   
                        type="text" 
                        name="name"
                        onChange={handleChange} 
                        value={values.name}
                        isInvalid={!!errors.name}
                        placeholder="Enter name "
                      />

                    </InputGroup>
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label className='a1'>Enter Password</Form.Label>
                    <InputGroup><InputGroupText className='user_icon'><i class="bi bi-person-fill-lock"></i></InputGroupText>
                    <Form.Control
                      className='formcontrol'
                      type="password"
                      name="pass"
                      onChange={handleChange}
                      value={values.pass}
                      isInvalid={!!errors.pass}
                      placeholder="Enter your password"
                    />
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">{errors.pass}</Form.Control.Feedback>
                  </Form.Group>

                  <Button type='submit' className='login_button'>Login</Button>

                </Form>
              )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
        <Col md="3"></Col>
      </Row>
    </div>
  )
}



export default Loginpage
