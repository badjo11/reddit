import React, { useContext, useEffect } from "react";
import { postsContext } from "../../contexts/PostsContext";
import Post from "./Post";
import { useParams } from "react-router-dom";

const PostList = (props) => {
  const { roomposts, mainFeedPosts } = useContext(postsContext);
  const { roomtitle } = useParams();
  console.log(mainFeedPosts);

  useEffect(() => null, [roomposts]);

  if (props.feedFor === "roomfeed") {
    return (
      <div>
        {roomposts.reverse().map((item) => (
          <Post key={item.id} item={item} roomtitle={roomtitle} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        {mainFeedPosts.reverse().map((item) => (
          <Post key={item.id} item={item} roomtitle={roomtitle} />
        ))}
      </div>
    );
  }
};

export default PostList;
