import React, { useReducer } from "react";
import axios from "axios";
import { APIComments } from "../helpers/config";

export const commentsContext = React.createContext();
const INIT_STATE = {
  commentsForPost: [],
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "COMMENTS_FOR_POST":
      return { ...state, commentsForPost: action.payload };
    default:
      return state;
  }
};

const CommentsContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const createComment = async (commentContent, user, createdAt, postId) => {
    let comment = {
      comment: commentContent,
      owner: user,
      createdAt,
      postId,
      likesWeight: 0,
    };
    try {
      let res = await axios.post(APIComments, comment);
    } catch (e) {
      console.log(e);
    }
  };

  const getCommentsForRoom = async (postId) => {
    try {
      let tempApi = APIComments + "?postId=" + postId;
      // console.log(tempApi)
      let result = await axios(tempApi);
      dispatch({
        type: "COMMENTS_FOR_POST",
        payload: result.data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <commentsContext.Provider
      value={{
        createComment,
        getCommentsForRoom,
        commentsForPost: state.commentsForPost,
      }}
    >
      {props.children}
    </commentsContext.Provider>
  );
};

export default CommentsContextProvider;
