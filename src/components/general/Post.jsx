import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import upvote from "../../images/upvote.png";
import downvote from "../../images/downvote.png";

function timeSince(date) {
  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

const Post = ({ item, roomtitle }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    setTimeLeft(timeSince(item.CreatedAtMs));
  }, []);

  console.log(item);

  function handleUpVote(e) {
    e.preventDefault();
  }

  function handleDownVote(e) {
    e.preventDefault();
  }

  return (
    <div className="postCard">
      <div className="likedislike">
        <a href="" onClick={(e) => handleUpVote(e)}>
          <img alt="fuckoff" className="upvoteIMG" src={upvote}></img>
        </a>
        <h3 className="VoteWeightNum">{item.voteWeight}</h3>
        <a href="" onClick={(e) => handleDownVote(e)}>
          <img alt="fuckoff" className="downvoteIMG" src={downvote}></img>
        </a>
      </div>
      <Card.Link
        className="mainPostCard"
        key={item.id + "card"}
        href={"/r/" + item.roomtitle + "/comments/" + item.id}
      >
        <Card key={item.id} style={{ width: "95%", marginTop: "10px" }}>
          <Card.Body>
            <Card.Subtitle
              style={{ fontSize: "12px" }}
              className="mb-2 text-muted"
            >
              Posted by: {item.owner} at {item.CreatedAt.match(/.{10}/)}{" "}
              {item.CreatedAt[11]}
              {item.CreatedAt[12]}
              {item.CreatedAt[13]}
              {item.CreatedAt[14]}
              {item.CreatedAt[15]} {timeLeft} ago
            </Card.Subtitle>
            <Card.Title style={{ paddingTop: "5px", paddingBottom: "5px" }}>
              {item.postName}
            </Card.Title>
            <Card.Text>{item.postText}</Card.Text>
          </Card.Body>
          <Card.Footer></Card.Footer>
        </Card>
      </Card.Link>
    </div>
  );
};

export default Post;
