import React from "react";
import "./general.css";
import iMG from "../../images/userdef.png";

const CreatePost = () => {
  return (
    <div className="createPostComp">
      <img className="defImg" src={iMG}></img>
      <input
        className="createPostInp"
        type="text"
        placeholder="create a post"
      ></input>
    </div>
  );
};

export default CreatePost;
