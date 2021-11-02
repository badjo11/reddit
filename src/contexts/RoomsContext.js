import React, { useReducer } from "react";
import axios from "axios";
export const roomsContext = React.createContext();
const API = "http://localhost:8000/rooms/";
const APIs = "http://localhost:8000/rooms";

const INIT_STATE = {
  rooms: [],
  rooms5: [],
  specificRoom: null,
  room_exist: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_ROOMS":
      return { ...state, rooms: action.payload };
    case "ROOMS_5":
      return { ...state, rooms5: action.payload };
    case "ROOM_EXIST":
      return { ...state, room_exist: action.payload };
    case "SPECIFIC_ROOM":
      return { ...state, specificRoom: action.payload };
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

  const get5rooms = async () => {
    try {
      let res = await axios(APIs + "?_page=1&_limit=5");
      dispatch({
        type: "ROOMS_5",
        payload: res.data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getRoomByTitle = async (title) => {
    try {
      let apiii = APIs + "?roomtitle=" + title;
      console.log(apiii);
      let res = await axios.get(apiii);
      dispatch({
        type: "SPECIFIC_ROOM",
        payload: res.data,
      });
    } catch (e) {}
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
        get5rooms,
        getRoomByTitle,
        rooms: state.rooms,
        rooms5: state.rooms5,
        specificRoom: state.specificRoom,
      }}
    >
      {props.children}
    </roomsContext.Provider>
  );
};

export default RoomsContextProvider;
