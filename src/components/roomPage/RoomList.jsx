import React, { useContext, useEffect } from "react";
import { roomsContext } from "../../contexts/RoomsContext";

const RoomList = () => {
  const { getAllRooms, rooms } = useContext(roomsContext);
  useEffect(() => {
    getAllRooms();
  }, []);
  return (
    <>
      {" "}
      <div className="mainListAllRooms">
        {rooms.length > 0 ? (
          rooms.map((item) => (
            <a key={item.id} href={"/r/" + item.roomtitle}>
              <h3>{item.roomtitle}</h3>
            </a>
          ))
        ) : (
          <h2>loading...</h2>
        )}
      </div>
      <div className="sidebarAllRooms"></div>
    </>
  );
};

export default RoomList;
