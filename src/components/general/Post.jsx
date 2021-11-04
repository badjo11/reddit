import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";

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

  return (
    <Card.Link
      key={item.id + "card"}
      href={"/r/" + roomtitle + "/comments/" + item.id}
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
          <Card.Title>{item.postName}</Card.Title>

          <Card.Text>{item.postText}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="danger">
            <img
              width="20px"
              src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
            />
          </Button>
        </Card.Footer>
      </Card>
    </Card.Link>
  );
};

export default Post;
