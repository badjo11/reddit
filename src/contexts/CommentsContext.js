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

  //   const createComment = async (post, user, createdAt, roomtitle) => {
  //     post["roomtitle"] = roomtitle;
  //     post["owner"] = user.username;
  //     post["CreatedAt"] = createdAt;
  //     try {
  //       await axios.post(APIposts, post);
  //       getPostsByRoom(roomtitle);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   const getPostsByRoom = async (title) => {
  //     try {
  //       let tempApi = APIsposts + "?roomtitle=" + title;
  //       // console.log(tempApi)
  //       let result = await axios(tempApi);
  //       dispatch({
  //         type: "ROOM_POSTS",
  //         payload: result.data,
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  return (
    <commentsContext.Provider
      value={{
        commentsForPost: state.commentsForPost,
      }}
    >
      {props.children}
    </commentsContext.Provider>
  );
};

export default CommentsContextProvider;
