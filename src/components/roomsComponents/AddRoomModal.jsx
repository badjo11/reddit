import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddRoomModal = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });

  function handleChange(e) {
    let userr = { ...user, [e.target.name]: e.target.value };
    setUser(userr);
  }

  function handleSignup(e) {}
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Room title</Form.Label>
              <Form.Control
                type="text"
                placeholder="select room title"
                onChange={handleChange}
                name="roomtitle"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handleChange}
                name="password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign up
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddRoomModal;
