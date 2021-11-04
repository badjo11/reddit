import React, { useContext, useEffect } from "react";
import "./roombody.css";
import CreatePost from "../general/CreatePost";
import { Link, useParams } from "react-router-dom";
import { postsContext } from "../../contexts/PostsContext";
import PostList from "../general/PostList";
import { roomsContext } from "../../contexts/RoomsContext";
import AboutRoomCard from "./AboutRoomCard";
import { mainContext } from "../../contexts/MainContext";

const RoomBody = () => {
  const { roomtitle } = useParams();
  const { getPostsByRoom } = useContext(postsContext);
  const { specificRoom } = useContext(roomsContext);
  const { state } = useContext(mainContext);
  useEffect(() => {
    getPostsByRoom(roomtitle);
  }, []);

  let usr = "";
  if (state.user) {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    usr = user;
  }

  if (specificRoom === "error") {
    return (
      <div>
        <h1>ROOM NOT FOUND</h1>
        <Link to="/">Go back to main page</Link>
      </div>
    );
  } else {
    return (
      <div style={{ backgroundColor: "#DAE0E6" }}>
        <div className="container d-flex">
          <div className="rooms__body_posts">
            <CreatePost roomtitle={roomtitle} />
            <PostList feedFor={"roomfeed"} usr={usr} />
          </div>
          <div className="rooms__body_sidebar">
            <AboutRoomCard roomtitle={roomtitle} />
          </div>
        </div>
      </div>
    );
  }
};

export default RoomBody;
