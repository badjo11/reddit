import React, { useContext, useEffect, useState } from "react";
import "./roombody.css";
import { Button, Card } from "react-bootstrap";
import CreatePost from '../general/CreatePost'
import { useParams } from "react-router-dom";
import { postsContext } from "../../contexts/PostsContext";
import PostList from "../general/PostList";

const RoomBody = () => {
  const { roomtitle } = useParams();
  const { roomposts, getPostsByRoom } = useContext(postsContext)
  // const [posts, setPosts] = useState([])
  useEffect(() => {
    getPostsByRoom(roomtitle)
  }, [])
  return (
    <div className="bg-secondary">
      <div className="container d-flex">
        <div className="rooms__body_posts">
          <div className="rooms__body_posts-rank d-flex">
            <img
              alt="fuckoff"
              src="https://cdn-icons.flaticon.com/png/512/4325/premium/4325956.png?token=exp=1635491130~hmac=50e9f7609ad852e02280a795ef9c7583"
            />
            <p className="pt-4">Hot</p>
            <img
              alt="fuckoff"
              src="https://cdn-icons.flaticon.com/png/512/4325/premium/4325956.png?token=exp=1635491130~hmac=50e9f7609ad852e02280a795ef9c7583"
            />
            <p className="pt-4">Hot</p>
            <img
              alt="fuckoff"
              src="https://cdn-icons.flaticon.com/png/512/4325/premium/4325956.png?token=exp=1635491130~hmac=50e9f7609ad852e02280a795ef9c7583"
            />
            <p className="pt-4">Hot</p>
          </div>
          <CreatePost roomtitle={roomtitle} />
          <PostList />
        </div>
        <div className="rooms__body_sidebar">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoomBody;
