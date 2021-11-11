import React, { useContext, useEffect } from "react";
import { postsContext } from "../../../contexts/PostsContext";
import MainFeed from "./MainFeed";
import "./mainps.css";
import MainPSideB from "./MainPSideB";

const MainPS = () => {
  const { getPostsForMainUserFeed } = useContext(postsContext);

  let roomTitles = ["firstClean", "secondClean"];
  // if (user) {
  //   roomTitles = user.roomTitles;
  // } else {
  //   roomTitles = ["firstClean", "secondClean"];
  // }

  useEffect(() => getPostsForMainUserFeed(roomTitles), []);

  return (
    <div className="mainPS">
      <MainFeed />
      <MainPSideB />
    </div>
  );
};

export default MainPS;
