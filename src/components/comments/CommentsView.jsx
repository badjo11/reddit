import React, { useContext, useEffect } from "react";
import { commentsContext } from "../../contexts/CommentsContext";
import Comment from "./Comment";
const CommentsView = (props) => {
  const { commentsForPost, getCommentsForRoom } = useContext(commentsContext);
  // console.log(props.specificPost);
  useEffect(() => {
    getCommentsForRoom(props.specificPost.id);
  }, []);
  return (
    <>
      <div className="headings d-flex align-items-center mb-3">
        <h5>Comments({commentsForPost.length})</h5>
      </div>
      <div style={{ backgroundColor: "#f2f2f2" }}>
        {commentsForPost.reverse().map((item) => (
          <Comment key={item.id} val={item} />
        ))}
      </div>
    </>
  );
};

export default CommentsView;
