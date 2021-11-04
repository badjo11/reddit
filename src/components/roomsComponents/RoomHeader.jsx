import React, { useContext, useState, useEffect } from "react";
import "./roomheader.css";
import { Button } from "react-bootstrap";
import { roomsContext } from "../../contexts/RoomsContext";
import { mainContext } from "../../contexts/MainContext";
import { useParams } from "react-router-dom";

const RoomHeader = () => {
  const {
    specificRoom,
    getRoomByTitle,
    addMemberToARoom,
    removeMemberFromARoom,
    memberCount,
  } = useContext(roomsContext);
  const { userLeavesRoom, userJoinRoom, user } = useContext(mainContext);
  const { roomtitle } = useParams();
  const [room, setRoom] = useState({ joined: false });
  function userJoinedQM() {
    let usr = localStorage.getItem("user");
    usr = JSON.parse(usr);
    if (specificRoom) {
      if (usr) {
        for (let i = 0; i < usr["rooms"].length; i++) {
          if (usr["rooms"][i] === specificRoom[0].id) {
            setRoom({ joined: true });
          }
        }
      }
    }
  }

  useEffect(() => getRoomByTitle(roomtitle), []);
  useEffect(() => userJoinedQM(), [specificRoom]);

  let joinedRender;
  if (room.joined === true) {
    joinedRender = (
      <Button onClick={handleLeave} className="join-btn" variant="warning">
        Joined
      </Button>
    );
  } else {
    joinedRender = (
      <Button onClick={handleJoin} className="join-btn" variant="warning">
        Join
      </Button>
    );
  }

  function updateUser() {
    let struser = JSON.stringify(user);
    localStorage.setItem("user", struser);
  }

  function handleJoin() {
    userJoinRoom(user, specificRoom[0].id, roomtitle);
    setRoom({ joined: true });
    addMemberToARoom(specificRoom[0].id, memberCount + 1);
    console.log(memberCount, memberCount + 1, "memberCount ++");

    setTimeout(() => updateUser(), 200);
  }

  function handleLeave() {
    userLeavesRoom(user, specificRoom[0].id, roomtitle);
    setRoom({ joined: false });
    removeMemberFromARoom(specificRoom[0].id, memberCount - 1);
    console.log(memberCount, memberCount - 1, "memberCount --");
    setTimeout(() => updateUser(), 200);
  }

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
          <div>
            <h3 className="roomtitlesign">{roomtitle}</h3>
            {joinedRender}
          </div>
          <p className="">{"/r/" + roomtitle}</p>
        </div>
      </div>
    </>
  );
};

export default RoomHeader;
