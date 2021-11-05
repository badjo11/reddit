import React, { useContext, useEffect } from "react";
import { Card, ListGroupItem, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { roomsContext } from "../../contexts/RoomsContext";

const RoomsListSideBar = () => {
  const { get5rooms, rooms5 } = useContext(roomsContext);

  useEffect(() => get5rooms(), []);

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
        <Link to='/rooms'> <Button variant="primary" className="mt-2" style={{ borderRadius: "10px", marginLeft: '40%', fontSize: '20px' }}>View all</Button></Link>
      </Card.Body>
    </Card>
  );
};

export default RoomsListSideBar;
