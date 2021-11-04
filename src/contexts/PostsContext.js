import React, { useReducer } from "react";
import axios from "axios";
import { APIposts, APIsposts } from "../helpers/config";

export const postsContext = React.createContext();
const INIT_STATE = {
  posts: [],
  roomposts: [],
  specificPost: null,
  mainFeedPosts: [],
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ROOM_POSTS":
      return { ...state, roomposts: action.payload };
    case "MAIN_FEED_POSTS":
      return {
        ...state,
        mainFeedPosts: state.mainFeedPosts.concat(action.payload),
      };
    case "SPECIFIC_POST":
      return {
        ...state,
        specificPost: action.payload,
      };
    default:
      return state;
  }
};

const PostsContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const createPost = async (post, user, createdAt, roomtitle, timeMls) => {
    post["roomtitle"] = roomtitle;
    post["owner"] = user.username;
    post["CreatedAt"] = createdAt;
    post["CreatedAtMs"] = timeMls;
    post["voteWeight"] = 0;
    try {
      await axios.post(APIposts, post);
      getPostsByRoom(roomtitle);
    } catch (e) {
      console.log(e);
    }
  };

  const getSpecificPost = async (id) => {
    try {
      let res = await axios(APIposts + id);
      dispatch({
        type: "SPECIFIC_POST",
        payload: res.data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getPostsForMainUserFeed = async (titles) => {
    titles.forEach(async (title) => {
      try {
        let tempApi = APIsposts + "?roomtitle=" + title + "&_limit=10";
        let result = await axios(tempApi);
        dispatch({
          type: "MAIN_FEED_POSTS",
          payload: result.data,
        });
      } catch (e) {}
    });
  };

  const getPostsByRoom = async (title) => {
    try {
      let tempApi = APIsposts + "?roomtitle=" + title;
      // console.log(tempApi)
      let result = await axios(tempApi);
      dispatch({
        type: "ROOM_POSTS",
        payload: result.data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const upVoteAPost = async (postId, weight, roomTitles, roomTitle) => {
    console.log(postId, weight, roomTitles, roomTitle);
    try {
      let res = await axios.patch(APIposts + postId, {
        voteWeight: weight + 1,
      });
      if (roomTitles) {
        getPostsForMainUserFeed(roomTitles);
      } else {
        getPostsByRoom(roomTitle);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const downVoteAPost = async (postId, weight, roomTitles, roomTitle) => {
    try {
      let res = await axios.patch(APIposts + postId, {
        voteWeight: weight - 1,
      });
      if (roomTitles) {
        getPostsForMainUserFeed(roomTitles);
      } else {
        getPostsByRoom(roomTitle);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <postsContext.Provider
      value={{
        createPost,
        getPostsByRoom,
        getPostsForMainUserFeed,
        getSpecificPost,
        upVoteAPost,
        downVoteAPost,
        specificPost: state.specificPost,
        roomposts: state.roomposts,
        mainFeedPosts: state.mainFeedPosts,
      }}
    >
      {props.children}
    </postsContext.Provider>
  );
};

export default PostsContextProvider;
