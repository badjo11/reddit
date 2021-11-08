import React, { useContext, useState } from "react";
import "./general.css";
import iMG from "../../images/userdef.png";
import { Button, Form, Modal } from "react-bootstrap";
import { postsContext } from "../../contexts/PostsContext";
import { useParams } from "react-router";

const CreatePost = ({ roomtitle }) => {
  const { createPost } = useContext(postsContext);
  const [show, setShow] = useState(false);
  const linkParams = useParams();

  const [post, setPost] = useState({
    postText: "",
    postImgURL: "",
  });

  const [roomTitle, setRoomTitle] = useState("");

  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  function handleChange(e) {
    let tempPost = { ...post, [e.target.name]: e.target.value };
    setPost(tempPost);
  }
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (user) {
      setShow(true);
    } else {
      alert("Please login or sign up to make posts");
    }
  };

  function handleCreate(e) {
    let time = new Date();
    let timeMls = Date.now();
    if (roomtitle) {
      createPost(post, user, time, roomtitle, timeMls);
      handleClose();
    } else {
      if (roomTitle === "") {
        console.log("here");
        setRoomTitle(user.roomTitles[0]);
      }
      setTimeout(() => {
        createPost(post, user, time, roomTitle, timeMls);
      }, 100);
      handleClose();
    }
  }

  let selectRoom = <></>;

  if (!linkParams.roomtitle && user) {
    //setRoomTitle(
    selectRoom = (
      <Form.Group className="mb-3">
        <Form.Label>Select a room you want to post in</Form.Label>
        <Form.Select
          aria-label="Default select example"
          name="roomtitle"
          onChange={(e) => setRoomTitle(e.target.value)}
          value={roomTitle}
        >
          {user.roomTitles.map((item) => (
            <option key={item + 1} value={item}>
              {item}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    );
  }

  return (
    <div className="createPostComp">
      <img alt="fuckoff" className="defImg" src={iMG}></img>
      <input
        className="createPostInp"
        type="text"
        placeholder="create a post"
        onClick={handleShow}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Post creating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {selectRoom}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Your post</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="postText"
                type="text"
                placeholder="post"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="postImgURL"
                type="text"
                placeholder="image URL for your post"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleCreate();
            }}
          >
            Create Post
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreatePost;
