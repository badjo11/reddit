import React from "react";
import CreatePost from "../../general/CreatePost";
import PostList from "../../general/PostList";
import "./mainps.css";

const MainFeed = () => {
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
