import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { roomsContext } from "../../contexts/RoomsContext";

const AddRoomModal = (props) => {
  const { createRoom } = useContext(roomsContext);

  const [room, setRoom] = useState({
    roomtitle: "",
    category: "",
    about: "",
    avaURl: "",
    memberCount: 0,
  });

  function handleChange(e) {
    let userr = { ...room, [e.target.name]: e.target.value };
    setRoom(userr);
  }

  function handleCreation(e) {
    e.preventDefault();
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    let time = new Date();
    createRoom(room, user, time);
    props.handleClose();
  }

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreation}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Room title</Form.Label>
              <Form.Control
                type="text"
                placeholder="select room title"
                onChange={handleChange}
                name="roomtitle"
              />
            </Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Select
                onChange={handleChange}
                name="category"
                aria-label="Default select example"
              >
                <option value="default">select your categoty</option>
                <option value="storts">sports</option>
                <option value="gaming">gaming</option>
                <option value="news">news</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>About room</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="about room"
                onChange={handleChange}
                name="about"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Room avatar URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="image url"
                onChange={handleChange}
                name="avaURl"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create room
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddRoomModal;
