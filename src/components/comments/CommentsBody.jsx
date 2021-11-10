import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { postsContext } from "../../contexts/PostsContext";
import Post from "../general/Post";
import "./comments.css";
import CommentsView from "./CommentsView";
import CreateComment from "./CreateComment";
import SubheaderComments from "./SubheaderComments";
import { votesContext } from "../../contexts/VoteContext";

const CommentsBody = () => {
  const params = useParams();
  const { getSpecificPost, specificPost } = useContext(postsContext);
  const {
    getvotesForPosts,
    votesForPosts,
    getvotesForComments,
    votesForComments,
  } = useContext(votesContext);

  useEffect(() => {
    getSpecificPost(params.commentId);
  }, []);

  let usr = "";
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  if (user) {
    usr = user;
  }

  useEffect(() => (usr !== "" ? getvotesForPosts(usr.username) : null), []);
  useEffect(() => (usr !== "" ? getvotesForComments(usr.username) : null), []);

  let post;
  if (specificPost && votesForPosts) {
    post = (
      <Post
        item={specificPost}
        roomtitle={params.roomtitle}
        votesForPosts={votesForPosts}
      />
    );
  } else {
    post = <div>Loading</div>;
  }
  let commentView;
  if (specificPost && votesForComments) {
    commentView = (
      <>
        <CreateComment specificPost={specificPost} />
        <CommentsView
          specificPost={specificPost}
          votesForComments={votesForComments}
        />
      </>
    );
  } else {
    <></>;
  }
  return (
    <div className="roomBody">
      <SubheaderComments />
      {post}
      {commentView}
    </div>
  );
};

export default CommentsBody;
