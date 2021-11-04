import React, { useContext, useEffect } from "react";
import MainFeed from "./MainFeed";
import "./mainps.css";
import MainPSideB from "./MainPSideB";
import { postsContext } from "../../../contexts/PostsContext";
import { mainContext } from "../../../contexts/MainContext";

const MainPS = () => {
  const { getPostsForMainUserFeed } = useContext(postsContext);
  const { state } = useContext(mainContext);

  let roomTitles;
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  if (user) {
    roomTitles = user.roomTitles;
  } else {
    roomTitles = ["firstClean", "secondClean"];
  }

  useEffect(() => getPostsForMainUserFeed(roomTitles), []);

  return (
    <div className="mainPS">
      <MainFeed />
      <MainPSideB />
    </div>
  );
};

export default MainPS;
