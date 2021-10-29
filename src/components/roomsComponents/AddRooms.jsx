import React, { useState, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import AddRoomModal from "./AddRoomModal";
import { mainContext } from "../../contexts/MainContext.js";

const AddRooms = () => {
  const { state } = useContext(mainContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  function handleShow() {
    if (state.user) {
      setShow(true);
    }
  }

  return (
    <div className="createRoomCard">
      <Card
        bg={"light"}
        text={"dark"}
        style={{ width: "18rem" }}
        className="mb-2"
      >
        <Card.Header>Create your own Room</Card.Header>
        <Card.Body>
          <Card.Text>
            Your personal Reddit frontpage. Come here to check in with your
            favorite communities.
          </Card.Text>
          <Button variant="primary" onClick={handleShow}>
            Create room
          </Button>
        </Card.Body>
      </Card>
      <AddRoomModal handleClose={handleClose} show={show} />
    </div>
  );
};

export default AddRooms;
