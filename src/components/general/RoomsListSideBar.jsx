import React, { useContext, useEffect } from "react";
import { Card, ListGroupItem } from "react-bootstrap";
import { roomsContext } from "../../contexts/RoomsContext";

const RoomsListSideBar = () => {
  const { get5rooms, rooms5 } = useContext(roomsContext);

  useEffect(() => get5rooms(), []);
  console.log(rooms5);

  return (
    <Card className="toproomlistsidebar sidebaritem" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>Top Communities</Card.Title>
      </Card.Body>
      <Card.Body>
        {rooms5.map((item, index) => (
          <Card.Link key={index + "card"} href={"/r/" + item.roomtitle}>
            <ListGroupItem>
              {index + 1}. {item.roomtitle}
            </ListGroupItem>
          </Card.Link>
        ))}
      </Card.Body>
    </Card>
  );
};

export default RoomsListSideBar;
