import React, { useReducer } from "react";
import axios from "axios";
import { APIvotes } from "../helpers/config";

export const votesContext = React.createContext();
const INIT_STATE = {
  votesForPosts: [],
  votesForComments: [],
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_VOTES_FOR_POSTS":
      return { ...state, votesForPosts: action.payload };
    case "GET_VOTES_FOR_COMMENTS":
      return { ...state, votesForComments: action.payload };
    default:
      return state;
  }
};

const VotesContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const createAVoteForAPost = async (value, username, postId) => {
    let time = Date.now();
    let vote = {
      value: value,
      owner: username,
      createdAt: time,
      postId,
      commentId: "null",
    };
    try {
      await axios.post(APIvotes, vote);
      getvotesForPosts(username);
    } catch (e) {
      console.log(e);
    }
  };

  const createAVoteForAComment = async (value, username, commentId) => {
    let time = Date.now();
    let vote = {
      value: value,
      owner: username,
      createdAt: time,
      postId: "null",
      commentId,
    };
    try {
      await axios.post(APIvotes, vote);
      getvotesForComments(username);
    } catch (e) {
      console.log(e);
    }
  };

  const getvotesForComments = async (username) => {
    try {
      let res = await axios(APIvotes + "?owner=" + username + "&postId=null");
      dispatch({
        type: "GET_VOTES_FOR_COMMENTS",
        payload: res.data,
      });
    } catch (e) {}
  };

  const updateAVoteForAComment = async (id, value, username) => {
    try {
      await axios.patch(APIvotes + id, { value });
      getvotesForComments(username);
    } catch (e) {
      console.log(e);
    }
  };

  const updateAVoteForAPost = async (id, value, username) => {
    try {
      await axios.patch(APIvotes + id, { value });
      getvotesForPosts(username);
    } catch (e) {
      console.log(e);
    }
  };

  const getvotesForPosts = async (username) => {
    try {
      let res = await axios(
        APIvotes + "?owner=" + username + "&commentId=null"
      );
      dispatch({
        type: "GET_VOTES_FOR_POSTS",
        payload: res.data,
      });
    } catch (e) {}
  };

  return (
    <votesContext.Provider
      value={{
        votesForPosts: state.votesForPosts,
        votesForComments: state.votesForComments,
        createAVoteForAPost,
        updateAVoteForAPost,
        getvotesForPosts,
        updateAVoteForAComment,
        getvotesForComments,
        createAVoteForAComment,
      }}
    >
      {props.children}
    </votesContext.Provider>
  );
};

export default VotesContextProvider;
