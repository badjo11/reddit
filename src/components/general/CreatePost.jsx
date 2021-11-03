import React, { useContext, useState } from "react";
import "./general.css";
import iMG from "../../images/userdef.png";
import { Button, Form, Modal } from 'react-bootstrap';
import { postsContext } from "../../contexts/PostsContext";

const CreatePost = ({ roomtitle }) => {
  const { createPost, getPostsByRoom } = useContext(postsContext)
  const [show, setShow] = useState(false);
  // const { roomtitle } = useParams();

  const [post, setPost] = useState({
    postName: "",
    postText: "",
  })


  function handleChange(e) {
    let tempPost = { ...post, [e.target.name]: e.target.value }
    setPost(tempPost)
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  function handleCreate(e) {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    let time = new Date();
    console.log(time)
    createPost(post, user, time, roomtitle);
    handleClose()
  }


  return (
    <div className="createPostComp">
      <img alt="fuckoff" className="defImg" src={iMG}></img>
      <Button variant="primary" onClick={handleShow} >Create post</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Post creating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Post name</Form.Label>
              <Form.Control onChange={handleChange} name="postName" type="text" placeholder="post name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Text</Form.Label>
              <Form.Control onChange={handleChange} name="postText" as="textarea" rows={10} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            handleCreate()
          }}>
            Create Post
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
};

export default CreatePost;
