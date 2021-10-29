import React, { useReducer } from "react";
import axios from "axios";
export const roomsContext = React.createContext();
const API = "http://localhost:8000/rooms/";

const INIT_STATE = {
  rooms: [],
  room_exist: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_ROOMS":
      return { ...state, rooms: action.payload };
    case "ROOM_EXIST":
      return { ...state, room_exist: action.payload };
    default:
      return state;
  }
};

const RoomsContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getAllRooms = async () => {
    try {
      let { data } = await axios(API);
      dispatch({
        type: "ADD_ROOMS",
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const createRoom = async (room, user, createdAt) => {
    room["owner"] = user.username;
    room["CreatedAt"] = createdAt;
    console.log(room);
    try {
      let res = await axios(API);
      let rooms = res.data.find((rooms) => rooms.roomtitle === room.roomtitle);
      if (rooms === undefined) {
        try {
          await axios.post(API, room);
          getAllRooms();
          dispatch({
            type: "ROOM_EXIST",
            payload: false,
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        dispatch({
          type: "ROOM_EXIST",
          payload: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <roomsContext.Provider
      value={{
        createRoom,
        getAllRooms,
        state,
      }}
    >
      {props.children}
    </roomsContext.Provider>
  );
};

export default RoomsContextProvider;
