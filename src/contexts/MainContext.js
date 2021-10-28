import React, { useReducer } from "react";
import axios from "axios";
export const mainContext = React.createContext();
const API = "http://localhost:8000/users/";

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
      let res = await axios(API);
      let user = res.data.find((user) => user.username === username);
      if (user === undefined) {
        try {
          let { data } = await axios.post(API, { username, password });
          dispatch({
            type: "LOGIN_USER",
            payload: data,
          });
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loginUser = async (username, password) => {
    try {
      let res = await axios(API);
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
        state,
      }}
    >
      {props.children}
    </mainContext.Provider>
  );
};

export default MainContextProvider;
