import React, { useContext, useEffect } from "react";
import { Card } from "react-bootstrap";
import { roomsContext } from "../../contexts/RoomsContext";
import CreatePost from "../general/CreatePost";

const AboutRoomCard = (props) => {
  const { specificRoom, memberCount } = useContext(roomsContext);

  useEffect(() => {}, [memberCount]);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header
        style={{ backgroundColor: "#313638", color: "white" }}
        as="h3"
      >
        About comunity
      </Card.Header>
      <Card.Body>
        <Card.Title>{props.roomtitle}</Card.Title>
        <Card.Text>
          {specificRoom ? specificRoom[0].about : "About community"}
        </Card.Text>
        <Card.Text>{memberCount ? memberCount : "0"} members</Card.Text>
        <Card.Text style={{ fontSize: "12px" }}>
          Created by{" "}
          <span style={{ color: "blueviolet" }}>
            {specificRoom ? specificRoom[0].owner : "title"}
          </span>{" "}
          on{" "}
          <span style={{ color: "blueviolet" }}>
            {specificRoom ? specificRoom[0].CreatedAt.match(/.{10}/) : "time"}
          </span>
        </Card.Text>
        <CreatePost roomtitle={props.roomtitle} />
      </Card.Body>
    </Card>
  );
};

export default AboutRoomCard;
