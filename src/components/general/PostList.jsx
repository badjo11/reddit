import React, { useContext, useEffect } from "react";
import { postsContext } from "../../contexts/PostsContext";
import Post from "./Post";
import { useParams } from "react-router-dom";

const PostList = () => {
  const { roomposts, getPostsByRoom } = useContext(postsContext);
  const { roomtitle } = useParams();

  useEffect(() => null, [roomposts]);

  return (
    <div>
      {roomposts.map((item) => (
        <Post item={item} />
      ))}
    </div>
  );
};

export default PostList;
