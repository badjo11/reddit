import React, { useContext, useEffect } from "react";
import CreatePost from "../../general/CreatePost";
import PostList from "../../general/PostList";
import "./mainps.css";
import { mainContext } from "../../../contexts/MainContext";

const MainFeed = () => {
  const { state } = useContext(mainContext);

  let roomTitles;
  let usr = "";
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  if (user) {
    roomTitles = user.roomTitles;
    usr = user;
  } else {
    roomTitles = ["firstClean", "secondClean"];
  }

  return (
    <div className="mainFeed">
      <CreatePost feedFor={"mainfeed"} />
      <PostList roomTitles={roomTitles} usr={usr} />
    </div>
  );
};

export default MainFeed;
