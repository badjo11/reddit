import React from "react";
import { useParams } from "react-router-dom";
import "./comments.css";
import { useNavigate } from "react-router-dom";

const SubheaderComments = () => {
  const hz = useParams();

  const navigate = useNavigate();

  return (
    <div className="commentsSubHeader">
      <h2>{hz.roomtitle}</h2>
      <button
        onClick={() => navigate(-1)}
        style={{ border: 0, backgroundColor: "darkgray" }}
      >
        X
      </button>
    </div>
  );
};

export default SubheaderComments;
