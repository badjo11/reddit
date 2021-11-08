import React, { useContext, useEffect, useState } from "react";
import { postsContext } from "../../contexts/PostsContext";
import Post from "./Post";
import { useParams } from "react-router-dom";
import { votesContext } from "../../contexts/VoteContext";

const PostList = (props) => {
  let { roomposts, mainFeedPosts } = useContext(postsContext);
  const { getVotesForUserPosts, votesForUser } = useContext(votesContext);
  const [posts, setPosts] = useState(mainFeedPosts);
  const [roomPosts, setRoomPosts] = useState(roomposts);

  useEffect(() => {
    let arr = [...mainFeedPosts];
    arr.sort((a, b) => b.CreatedAtMs - a.CreatedAtMs);
    setPosts(arr);
  }, [mainFeedPosts]);

  const { roomtitle } = useParams();

  useEffect(() => {
    getVotesForUserPosts(props.usr.username);
  }, []);

  useEffect(() => {
    let arr = [...roomposts];
    arr.sort((a, b) => b.CreatedAtMs - a.CreatedAtMs);
    setRoomPosts(arr);
  }, [roomposts]);

  let count = 0;
  if (votesForUser.length > 0) {
    if (props.feedFor === "roomfeed") {
      return (
        <div>
          {roomPosts.map((item) => (
            <Post
              key={item.id + count + 1}
              item={item}
              roomtitle={roomtitle}
              votesForUser={votesForUser}
            />
          ))}
        </div>
      );
    } else {
      return (
        <div>
          {posts.map((item) => (
            <Post
              key={item.id + count + 1}
              item={item}
              roomTitles={props.roomTitles}
              roomtitle={roomtitle}
              votesForUser={votesForUser}
            />
          ))}
        </div>
      );
    }
  } else {
    if (props.feedFor === "roomfeed") {
      return (
        <div>
          {roomPosts.map((item) => (
            <Post
              key={item.id + count + 1}
              item={item}
              roomtitle={roomtitle}
              votesForUser={votesForUser}
            />
          ))}
        </div>
      );
    } else {
      return (
        <div>
          {posts.map((item) => (
            <Post
              key={item.id + count + 1}
              item={item}
              roomTitles={props.roomTitles}
              roomtitle={roomtitle}
              votesForUser={votesForUser}
            />
          ))}
        </div>
      );
    }
  }
};

export default PostList;
