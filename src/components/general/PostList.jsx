import React, { useContext, useEffect } from "react";
import { postsContext } from "../../contexts/PostsContext";
import Post from "./Post";
import { useParams } from "react-router-dom";
import { votesContext } from "../../contexts/VoteContext";
import { mainContext } from "../../contexts/MainContext";

const PostList = (props) => {
  const { roomposts, mainFeedPosts } = useContext(postsContext);
  const { getVotesForUserPosts, votesForUser } = useContext(votesContext);
  const { user } = useContext(mainContext);
  const { roomtitle } = useParams();

  // let user1 = localStorage.getItem("user");
  // user1 = JSON.parse(user1);
  useEffect(() => {
    getVotesForUserPosts(props.usr);
  }, []);

  console.log(user);
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
          <Post
            key={item.id}
            item={item}
            roomTitles={props.roomTitles}
            roomtitle={roomtitle}
          />
        ))}
      </div>
    );
  }
};

export default PostList;
