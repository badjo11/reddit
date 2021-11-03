import React from "react";
import CreatePost from "../../general/CreatePost";
import PostList from "../../general/PostList";
import "./mainps.css";

const MainFeed = () => {
  return (
    <div className="mainFeed">
      <CreatePost feedFor={"mainfeed"} />
      <PostList />
    </div>
  );
};

export default MainFeed;
