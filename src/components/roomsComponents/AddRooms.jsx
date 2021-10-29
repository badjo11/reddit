import React from "react";
import { Card, Button } from "react-bootstrap";

const AddRooms = () => {
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
          <Button>Create Room</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddRooms;
