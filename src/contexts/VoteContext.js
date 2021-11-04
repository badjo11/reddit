import React, { useReducer } from "react";
import axios from "axios";
import { APIvotes } from "../helpers/config";

export const votesContext = React.createContext();
const INIT_STATE = {
  votesForUser: [],
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_VOTES_FOR_USER":
      return { ...state, votesForUser: action.payload };
    default:
      return state;
  }
};

const VotesContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const createAVoteForAPost = async (value, username, roomId) => {
    let time = Date.now();
    let vote = {
      value: value,
      owner: username,
      createdAt: time,
      roomId,
    };
    try {
      let res = await axios.post(APIvotes, vote);
      getVotesForUserPosts(username);
    } catch (e) {
      console.log(e);
    }
  };

  const updateAVoteForAPost = async (value, username, roomId) => {};

  //const createAVoteForAComment = async () => {};

  const getVotesForUserPosts = async (username) => {
    console.log(username);
    try {
      let res = await axios(APIvotes + "?owner=" + username);
      dispatch({
        type: "GET_VOTES_FOR_USER",
        payload: res.data,
      });
    } catch (e) {}
  };

  return (
    <votesContext.Provider
      value={{
        votesForUser: state.votesForUser,
        createAVoteForAPost,
        updateAVoteForAPost,
        getVotesForUserPosts,
      }}
    >
      {props.children}
    </votesContext.Provider>
  );
};

export default VotesContextProvider;
