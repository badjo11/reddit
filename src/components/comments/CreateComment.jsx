import React, { useContext, useState } from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";
import { commentsContext } from "../../contexts/CommentsContext";

const CreateComment = (props) => {
  const { createComment } = useContext(commentsContext);
  const [comment, setComment] = useState("");

  function handleChange(e) {
    setComment(e.target.value);
  }
  function creatingComment(e) {
    e.preventDefault();
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    let time = new Date();
    let timeMls = Date.now();
    createComment(comment, user.username, time, props.specificPost.id, timeMls);
  }
  return (<>
    <InputGroup className="mb-3">
      <FormControl
        rows={2}
        as="textarea"
        placeholder="Your comment"
        maxLength="140"
        onChange={handleChange}
      />
      <Button onClick={creatingComment} variant="info">
        Comment
      </Button>
    </InputGroup>

  </>
  );
};

export default CreateComment;
