import React, { useReducer } from "react";
import axios from "axios";
import { APIComments } from "../helpers/config";

export const commentsContext = React.createContext();
const INIT_STATE = {
  commentsForPost: [],
  editedComment: null,
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "COMMENTS_FOR_POST":
      return { ...state, commentsForPost: action.payload };
    case "GET_COMMENT_BY_ID":
      return { ...state, editedComment: action.payload };
    default:
      return state;
  }
};

const CommentsContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const createComment = async (
    commentContent,
    user,
    createdAt,
    postId,
    createdAtMs
  ) => {
    let comment = {
      comment: commentContent,
      owner: user,
      createdAt,
      createdAtMs,
      postId,
      voteWeight: 0,
      edited: false,
    };

    try {
      await axios.post(APIComments, comment);
      getCommentsForRoom(postId);
    } catch (e) {
      console.log(e);
    }
  };

  const getCommentsForRoom = async (postId) => {
    try {
      let tempApi = APIComments + "?postId=" + postId;
      let result = await axios(tempApi);
      dispatch({
        type: "COMMENTS_FOR_POST",
        payload: result.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const getCommentById = async (comment) => {
    try {
      let response = await axios(APIComments + "/" + comment.id);
      dispatch({
        type: "GET_COMMENT_BY_ID",
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const editCommentById = async (comment, postId) => {
    try {
      await axios.patch(APIComments + "/" + comment.id, comment);
      getCommentsForRoom(postId);
    } catch (e) {
      console.log(e);
    }
  };
  const deleteCommentForPost = async (id, postId) => {
    try {
      let tempApi = APIComments + "/" + id;
      await axios.delete(tempApi);
      getCommentsForRoom(postId);
    } catch (e) {
      console.log(e);
    }
  };

  const upVoteAComment = async (CommentId, weight, value) => {
    try {
      await axios.patch(APIComments + CommentId, {
        voteWeight: weight + value,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const downVoteAComment = async (CommentId, weight, value) => {
    try {
      await axios.patch(APIComments + CommentId, {
        voteWeight: weight - value,
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
        deleteCommentForPost,
        editCommentById,
        getCommentById,
        upVoteAComment,
        downVoteAComment,
        commentsForPost: state.commentsForPost,
        editedComment: state.editedComment,
      }}
    >
      {props.children}
    </commentsContext.Provider>
  );
};

export default CommentsContextProvider;
