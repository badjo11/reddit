import React, { useContext, useEffect, useState } from "react";
import { commentsContext } from "../../contexts/CommentsContext";
import Comment from "./Comment";
const CommentsView = (props) => {
  const { commentsForPost, getCommentsForRoom } = useContext(commentsContext);
  // console.log(props.specificPost);
  const [comm, setComm] = useState(commentsForPost);
  useEffect(() => {
    getCommentsForRoom(props.specificPost.id);
  }, []);

  useEffect(() => {
    let arr = [...commentsForPost];
    arr.sort((a, b) => b.createdAtMs - a.createdAtMs);
    setComm(arr);
  }, [commentsForPost]);

  return (
    <>
      <div className="headings d-flex align-items-center mb-3">
        <h5 className="commentsCount">Comments({commentsForPost.length})</h5>
      </div>
      <div>
        {comm.map((item) => (
          <Comment
            key={item.id}
            val={item}
            votesForComments={props.votesForComments}
          />
        ))}
      </div>
    </>
  );
};

export default CommentsView;
