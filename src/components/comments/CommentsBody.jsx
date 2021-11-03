import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { postsContext } from "../../contexts/PostsContext";
import Post from "../general/Post";
import "./comments.css";
import SubheaderComments from "./SubheaderComments";

const CommentsBody = () => {
  const hz = useParams()
  const { getSpecificPost, specificPost } = useContext(postsContext)
  useEffect(() => {
    getSpecificPost(hz.id)
  }, [])
  let post;
  if (specificPost) {
    post = <Post item={specificPost} roomtitle={hz.roomtitle} />
  } else {
    post = (<div>suka</div>)
  }

  return (
    <div className="roomBody">
      <SubheaderComments />
      {post}
    </div>
  );
};

export default CommentsBody;
