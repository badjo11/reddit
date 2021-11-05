import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { roomsContext } from "../../contexts/RoomsContext";
import "./comments.css";

const SubheaderComments = () => {
  const { specificRoom } = useContext(roomsContext);
  console.log(specificRoom);
  const hz = useParams();

  // useEffect(() => {

  // }, [specificRoom])
  return (
    <div className="commentsSubHeader mt-4" style={{ border: 0, backgroundColor: "#ffffff" }}>
      <h2 >{hz.roomtitle}</h2>
      <Link to={"/r/" + hz.roomtitle} style={{ textDecoration: "none", color: "unset" }}>
        Leave room
        <button style={{ border: 0, backgroundColor: "#f2f2f2", borderRadius: "50%" }}>X</button>
      </Link>
    </div>
  );
};

export default SubheaderComments;
