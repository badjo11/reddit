import React, { useContext, useEffect } from "react";
import CreatePost from "../../general/CreatePost";
import PostList from "../../general/PostList";
import "./mainps.css";
import { postsContext } from "../../../contexts/PostsContext";
import { mainContext } from "../../../contexts/MainContext";

const MainFeed = () => {
  const { getPostsForMainUserFeed } = useContext(postsContext);
  const { state } = useContext(mainContext);

  let roomTitles;
  let usr = "";
  if (state.user) {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    roomTitles = user.roomTitles;
    usr = user;
  } else {
    roomTitles = ["firstClean", "secondClean"];
  }

  useEffect(() => getPostsForMainUserFeed(roomTitles), []);

  return (
    <div className="mainFeed">
      <CreatePost feedFor={"mainfeed"} />
      <PostList roomTitles={roomTitles} usr={usr} />
    </div>
  );
};

export default MainFeed;
