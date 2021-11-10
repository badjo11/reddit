import React, { useReducer } from "react";
import axios from "axios";
import { APIrooms, APIsrooms } from "../helpers/config";
export const roomsContext = React.createContext();

const INIT_STATE = {
  rooms: [],
  rooms5: [],
  specificRoom: null,
  room_exist: null,
  memberCount: 0,
  searchRoom: [],
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
    case "MEMBER_COUNT":
      return { ...state, memberCount: action.payload };
    case "SEARCH_ROOMS":
      return { ...state, searchRoom: action.payload };
    default:
      return state;
  }
};

const RoomsContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getAllRooms = async () => {
    try {
      let { data } = await axios(APIrooms);
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
      let res = await axios(APIsrooms + "?_page=1&_limit=5");
      dispatch({
        type: "ROOMS_5",
        payload: res.data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const addMemberToARoom = async (id, count) => {
    try {
      let res = await axios.patch(APIrooms + id, {
        memberCount: count,
      });
      dispatch({
        type: "MEMBER_COUNT",
        payload: res.data.memberCount,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const removeMemberFromARoom = async (id, count) => {
    try {
      let res = await axios.patch(APIrooms + id, {
        memberCount: count,
      });
      dispatch({
        type: "MEMBER_COUNT",
        payload: res.data.memberCount,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getRoomSearching = async (val) => {
    try {
      let { data } = await axios(APIrooms + "?q=" + val);
      let reg = new RegExp(val);
      let result = data.filter((term) => {
        if ("roomtitle" in term) {
          if (term.roomtitle.toLowerCase().match(reg)) {
            return term.roomtitle;
          }
        }
      });
      dispatch({
        type: "SEARCH_ROOMS",
        payload: result,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const wipeCleanSearchResultsRoom = () => {
    dispatch({
      type: "SEARCH_ROOMS",
      payload: [],
    });
  };
  const getRoomByTitle = async (title) => {
    try {
      let apiii = APIsrooms + "?roomtitle=" + title;
      let res = await axios.get(apiii);
      if (res.data.length > 0) {
        dispatch({
          type: "SPECIFIC_ROOM",
          payload: res.data,
        });
        dispatch({
          type: "MEMBER_COUNT",
          payload: res.data[0].memberCount,
        });
      } else {
        dispatch({
          type: "SPECIFIC_ROOM",
          payload: "error",
        });
      }
    } catch (e) {}
  };

  const createRoom = async (room, user, createdAt) => {
    room["owner"] = user.username;
    room["CreatedAt"] = createdAt;
    // console.log(room);
    try {
      let res = await axios(APIrooms);
      let rooms = res.data.find((rooms) => rooms.roomtitle === room.roomtitle);
      if (rooms === undefined) {
        try {
          await axios.post(APIrooms, room);
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
        addMemberToARoom,
        removeMemberFromARoom,
        getRoomSearching,
        wipeCleanSearchResultsRoom,
        memberCount: state.memberCount,
        rooms: state.rooms,
        rooms5: state.rooms5,
        specificRoom: state.specificRoom,
        searchRoom: state.searchRoom,
      }}
    >
      {props.children}
    </roomsContext.Provider>
  );
};

export default RoomsContextProvider;
