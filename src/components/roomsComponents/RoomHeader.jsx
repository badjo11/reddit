import React, { useContext, useEffect } from "react";
import "./roomheader.css";
import { Button } from "react-bootstrap";
import { roomsContext } from "../../contexts/RoomsContext";
import { useParams } from "react-router-dom";

const RoomHeader = () => {
  const { specificRoom, getRoomByTitle } = useContext(roomsContext);
  const { roomtitle } = useParams();

  useEffect(() => getRoomByTitle(roomtitle), []);
  console.log(specificRoom);

  return (
    <>
      <div className="rooms_header"></div>

      <div className="d-flex container bg-light">
        <div className="pe-4">
          <img
            width="100px"
            src="https://www.redditinc.com/assets/images/site/reddit-logo.png"
            alt="logo-of-room"
          />
          {/* <p className="ps-4">Posts</p> */}
        </div>
        <div className="room__body_title">
          <h1>
            {roomtitle} <Button variant="warning">Join</Button>
          </h1>
          <p className="text-muted">link of room</p>
        </div>
      </div>
    </>
  );
};

export default RoomHeader;
