import React, { useContext, useEffect } from "react";
import { commentsContext } from "../../contexts/CommentsContext";
import Comment from "./Comment";
const CommentsView = (props) => {
  const { commentsForPost, getCommentsForRoom } = useContext(commentsContext);
  console.log(props.specificPost);
  useEffect(() => {
    getCommentsForRoom(props.specificPost.id);
  }, []);
  return (
    <div style={{ backgroundColor: "darkgray" }}>
      {commentsForPost.reverse().map((item) => (
        <Comment key={item.id} val={item} />
      ))}
    </div>
  );
};

export default CommentsView;
