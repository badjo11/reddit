import React, { useContext, useEffect, useState } from "react";
import "./roombody.css";
import { Button, Card } from "react-bootstrap";
import CreatePost from '../general/CreatePost'
import { useParams } from "react-router-dom";
import { postsContext } from "../../contexts/PostsContext";
import PostList from "../general/PostList";
import { roomsContext } from "../../contexts/RoomsContext";

const RoomBody = () => {
  const { roomtitle } = useParams();
  const { roomposts, getPostsByRoom } = useContext(postsContext)
  const { specificRoom } = useContext(roomsContext)
  // console.log(specificRoom.roomtitle)
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
            <Card.Header style={{ backgroundColor: "#313638", color: "white" }} as="h3">About comunity</Card.Header>
            <Card.Body>
              <Card.Title>{roomtitle}</Card.Title>
              <Card.Text>
                {specificRoom ? ((specificRoom[0].about)) : ("About community")}
              </Card.Text>
              <Card.Text>
                {specificRoom ? ((specificRoom[0].memberCount)) : ("0")} members
              </Card.Text>
              <Card.Text style={{ fontSize: "12px" }} >
                Created by <span style={{ color: "blueviolet" }}>{specificRoom ? (specificRoom[0].owner) : ("title")}</span> on <span style={{ color: "blueviolet" }}>{specificRoom ? ((specificRoom[0].CreatedAt).match(/.{10}/)) : ("time")}</span>
              </Card.Text>
              <CreatePost roomtitle={roomtitle} />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoomBody;
