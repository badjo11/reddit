import React, { useContext, useEffect } from "react";
import { postsContext } from "../../contexts/PostsContext";
import Post from "./Post";
import { useParams } from "react-router-dom";
import { votesContext } from "../../contexts/VoteContext";

const PostList = (props) => {
  const { roomposts, mainFeedPosts } = useContext(postsContext);
  const { getVotesForUserPosts, votesForUser } = useContext(votesContext);
  //const { user } = useContext(mainContext);
  const { roomtitle } = useParams();

  useEffect(() => {
    getVotesForUserPosts(props.usr.username);
  }, []);

  useEffect(() => null, [roomposts]);
  let count = 0;
  if (votesForUser.length > 0) {
    if (props.feedFor === "roomfeed") {
      return (
        <div>
          {roomposts.reverse().map((item) => (
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
          {mainFeedPosts.reverse().map((item) => (
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
          {roomposts.reverse().map((item) => (
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
          {mainFeedPosts.reverse().map((item) => (
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
