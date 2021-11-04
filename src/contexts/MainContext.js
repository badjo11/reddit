import React, { useReducer } from "react";
import axios from "axios";
import { APIusers } from "../helpers/config";
export const mainContext = React.createContext();

const INIT_STATE = {
  user: null,
  failedLogin: null,
  //countryToEdit: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, user: action.payload };
    case "FAILED_LOGIN":
      return { ...state, failedLogin: action.payload };
    case "LOGOUT_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const MainContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const signUpUser = async (username, password) => {
    try {
      let res = await axios(APIusers);
      let user = res.data.find((user) => user.username === username);
      if (user === undefined) {
        try {
          let { data } = await axios.post(APIusers, {
            username,
            password,
            rooms: [],
            roomTitles: [],
          });
          dispatch({
            type: "LOGIN_USER",
            payload: data,
          });
          dispatch({
            type: "FAILED_LOGIN",
            payload: false,
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        dispatch({
          type: "FAILED_LOGIN",
          payload: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const userJoinRoom = async (user, roomId, roomTitle) => {
    user["rooms"].push(roomId);
    user["roomTitles"].push(roomTitle);
    console.log(user);
    try {
      let res = await axios.put(APIusers + user.id, user);
      dispatch({
        type: "LOGIN_USER",
        payload: res.data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const userLeavesRoom = async (user, roomId, roomTitle) => {
    user["rooms"] = user["rooms"].filter((item) => item !== roomId);
    user["roomTitles"] = user["roomTitles"].filter(
      (item) => item !== roomTitle
    );
    console.log(user);
    try {
      let res = await axios.put(APIusers + user.id, user);
      dispatch({
        type: "LOGIN_USER",
        payload: res.data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const loginUser = async (username, password) => {
    try {
      let res = await axios(APIusers);
      let user = res.data.find((user) => user.username === username);
      let bool = false;
      if (user) {
        bool = user.password === password ? true : false;
      }
      if (bool) {
        dispatch({
          type: "LOGIN_USER",
          payload: user,
        });
        dispatch({
          type: "FAILED_LOGIN",
          payload: false,
        });
      } else {
        dispatch({
          type: "FAILED_LOGIN",
          payload: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setUser = (user) => {
    dispatch({
      type: "LOGIN_USER",
      payload: user,
    });
  };

  const logoutUser = () => {
    dispatch({
      type: "LOGOUT_USER",
      payload: null,
    });
  };

  return (
    <mainContext.Provider
      value={{
        signUpUser,
        loginUser,
        logoutUser,
        setUser,
        userJoinRoom,
        userLeavesRoom,
        user: state.user,
        state,
      }}
    >
      {props.children}
    </mainContext.Provider>
  );
};

export default MainContextProvider;
