import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { mainContext } from "../../contexts/MainContext";
import * as yup from 'yup'
import { Formik } from 'formik'
const SignUpModal = (props) => {
  const { signUpUser } = useContext(mainContext);
  const [user, setUser] = useState({ username: "", password: "" });
  const schema = yup.object().shape({
    name: yup.string().min(2).max(30).required('Required'),
    lastName: yup.string().min(2).max(30).required('Required'),
    phoneNumber: yup.string().min(9).max(30).required('Required'),
    gender: yup.string().min(4).max(6).required('Required'),
    email: yup.string().email().min(3).max(255).required('Required'),
    password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).min(8).max(24).required('Required'),
  })
  function handleChange(e) {
    let userr = { ...user, [e.target.name]: e.target.value };
    setUser(userr);
  }

  function handleSignup(e) {
    e.preventDefault();
    signUpUser(user.username, user.password);
    props.handleClose();
  }

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(data) => console.log(data)}
            initialValues={{
              name: "",
              lastName: "",
              phoneNumber: "",
              gender: "",
              email: "",
              password: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form style={{ width: '70%' }} className="bg-light p-4" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                    isValid={!errors.email && touched.email}
                    isInvalid={!!errors.email}
                    value={values.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">

                  <Form.Label>Your name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    onChange={handleChange}
                    isValid={!errors.name && touched.name}
                    isInvalid={!!errors.name}
                    value={values.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Your last name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your last name"
                    name="lastName"
                    onChange={handleChange}
                    isValid={!errors.lastName && touched.lastName}
                    isInvalid={!!errors.lastName}
                    value={values.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Your phone number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your phone number"
                    name="phoneNumber"
                    onChange={handleChange}
                    isValid={!errors.phoneNumber && touched.phoneNumber}
                    isInvalid={!!errors.phoneNumber}
                    value={values.phoneNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phoneNumber}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="gender"
                    onChange={handleChange}
                    isValid={!errors.gender && touched.gender}
                    isInvalid={!!errors.gender}
                    value={values.gender}
                  >
                    <option>Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.gender}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    isValid={!errors.password && touched.password}
                    isInvalid={!!errors.password}
                    value={values.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}

          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUpModal;
