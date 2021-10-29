import React from "react";
import AddRooms from "../../roomsComponents/AddRooms";
import MainFeed from "./MainFeed";
import "./mainps.css";

const MainPS = () => {
  return (
    <div className="mainPS">
      <MainFeed />
      <AddRooms />
    </div>
  );
};

export default MainPS;
