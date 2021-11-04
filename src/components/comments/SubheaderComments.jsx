import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { roomsContext } from "../../contexts/RoomsContext";
import "./comments.css";

const SubheaderComments = () => {
  const { specificRoom } = useContext(roomsContext)
  console.log(specificRoom)
  const hz = useParams()

  // useEffect(() => {

  // }, [specificRoom])
  return (
    <div className="commentsSubHeader">
      <h2 >{hz.roomtitle}</h2>
      <Link to={'/r/' + hz.roomtitle}><button style={{ border: 0, backgroundColor: "darkgray" }} >X</button></Link>
    </div>
  );
};

export default SubheaderComments;
