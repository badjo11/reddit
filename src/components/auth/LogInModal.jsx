import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { mainContext } from "../../contexts/MainContext";

const LogInModal = (props) => {
  const { loginUser, logoutUser, state } = useContext(mainContext);
  const [user, setUser] = useState({ username: "", password: "" });
  // console.log(state)
  function handleChange(e) {
    let userr = { ...user, [e.target.name]: e.target.value };
    setUser(userr);
  }

  function delayLogin() {
    if (state.failedLogin) {
      props.handleCloseLogin();
    } else {
      // alert("Net takogo usera")
      console.log("No");
    }
  }

  function handleLogIn(e) {
    e.preventDefault();
    loginUser(user.username, user.password);
    setTimeout(delayLogin(), 500);
  }
  return (
    <>
      <Modal
        show={props.showLogin}
        onHide={props.handleCloseLogin}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogIn}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User name</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="username"
                type="text"
                placeholder="Enter user name"
              />
              <Form.Text className="text-muted">
                We'll never share your user name with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LogInModal;
