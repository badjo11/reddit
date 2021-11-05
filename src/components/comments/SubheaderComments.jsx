import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { roomsContext } from "../../contexts/RoomsContext";
import "./comments.css";
import { useNavigate } from "react-router-dom"

const SubheaderComments = () => {
  const { specificRoom } = useContext(roomsContext);
  console.log(specificRoom);
  const hz = useParams();

  const navigate = useNavigate()

  return (
    <div className="commentsSubHeader">
      <h2>{hz.roomtitle}</h2>
      <button onClick={() => navigate(-1)} style={{ border: 0, backgroundColor: "darkgray" }}>X</button>
    </div>
  );
};

export default SubheaderComments;



//   return (
//     <>
//       <button onClick={() => navigate(-2)}>
//         Go 2 pages back
//       </button>
//       <button onClick={() => navigate(-1)}>Go back</button>
//       <button onClick={() => navigate(1)}>
//         Go forward
//       </button>
//       <button onClick={() => navigate(2)}>
//         Go 2 pages forward
//       </button>
//     </>
//   );
// }

// <Link to={"/r/" + hz.roomtitle}>
//   <button style={{ border: 0, backgroundColor: "darkgray" }}>X</button>
// </Link>