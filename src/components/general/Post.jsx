import React, { useEffect, useState, useContext } from "react";
import { Card } from "react-bootstrap";
import upvote from "../../images/upvote.png";
import downvote from "../../images/downvote.png";
import { postsContext } from "../../contexts/PostsContext";
import { votesContext } from "../../contexts/VoteContext";
import { mainContext } from "../../contexts/MainContext";
import { useParams } from "react-router-dom";

import "./general.css";

export function timeSince(date) {
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

const Post = ({ item, roomtitle, roomTitles, votesForPosts }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [vtWeight, setvtWeight] = useState(item.voteWeight);
  const {
    downVoteAPost,
    upVoteAPost,
    getPostsForMainUserFeed,
    getPostsByRoom,
  } = useContext(postsContext);
  const { createAVoteForAPost, updateAVoteForAPost } = useContext(votesContext);
  const { user } = useContext(mainContext);
  const { deletePost } = useContext(postsContext);
  const params = useParams();
  let user1 = localStorage.getItem("user");
  user1 = JSON.parse(user1);

  function deletedPost() {
    deletePost(item.id, roomtitle);
    if (params.roomtitle) {
      getPostsByRoom(params.roomtitle);
    } else {
      getPostsForMainUserFeed(user1.roomTitles);
    }
  }

  function editPost() {}

  let delbtn;
  if (user1) {
    if (user1.username === item.owner) {
      delbtn = (
        <div className="dropdown">
          <button className="dropbtn">...</button>
          <div className="dropdown-content">
            <button onClick={deletedPost}>Delete</button>
            <button onClick={editPost}>Edit</button>
          </div>
        </div>
      );
    }
  }

  useEffect(() => {
    setTimeLeft(timeSince(item.CreatedAtMs));
  }, []);

  let vote = <h3 className="VoteWeightNum">{vtWeight}</h3>;
  if (user) {
    let index = votesForPosts.findIndex((post) => post.postId === item.id);
    if (index !== -1) {
      let voteWeight = votesForPosts[index].value;
      if (voteWeight === -1) {
        vote = (
          <h3 style={{ color: "purple" }} className="VoteWeightNum">
            {vtWeight}
          </h3>
        );
      } else if (voteWeight === 1) {
        vote = (
          <h3 style={{ color: "orange" }} className="VoteWeightNum">
            {vtWeight}
          </h3>
        );
      }
    }
  }

  function handleUpVote(e) {
    e.preventDefault();
    if (user) {
      let index = votesForPosts.findIndex((post) => post.postId === item.id);
      if (index > -1) {
        let voteWeight = votesForPosts[index].value;
        if (voteWeight === 0) {
          updateAVoteForAPost(votesForPosts[index].id, 1, user.username);
          upVoteAPost(item.id, vtWeight, roomTitles, roomtitle, 1);
          setvtWeight(vtWeight + 1);
        } else if (voteWeight === -1) {
          updateAVoteForAPost(votesForPosts[index].id, 1, user.username);
          upVoteAPost(item.id, vtWeight, roomTitles, roomtitle, 2);
          setvtWeight(vtWeight + 2);
        } else {
          updateAVoteForAPost(votesForPosts[index].id, 0, user.username);
          downVoteAPost(item.id, vtWeight, roomTitles, roomtitle, 1);
          setvtWeight(vtWeight - 1);
        }
      } else {
        upVoteAPost(item.id, vtWeight, roomTitles, roomtitle, 1);
        createAVoteForAPost(1, user.username, item.id);
        setvtWeight(vtWeight + 1);
      }
    }
  }

  function handleDownVote(e) {
    e.preventDefault();
    if (user) {
      let index = votesForPosts.findIndex((post) => post.postId === item.id);
      if (index > -1) {
        let voteWeight = votesForPosts[index].value;
        if (voteWeight === 0) {
          updateAVoteForAPost(votesForPosts[index].id, -1, user.username);
          downVoteAPost(item.id, vtWeight, roomTitles, roomtitle, 1);
          setvtWeight(vtWeight - 1);
        } else if (voteWeight === 1) {
          updateAVoteForAPost(votesForPosts[index].id, -1, user.username);
          downVoteAPost(item.id, vtWeight, roomTitles, roomtitle, 2);
          setvtWeight(vtWeight - 2);
        } else {
          updateAVoteForAPost(votesForPosts[index].id, 0, user.username);
          upVoteAPost(item.id, vtWeight, roomTitles, roomtitle, 1);
          setvtWeight(vtWeight + 1);
        }
      } else {
        downVoteAPost(item.id, vtWeight, roomTitles, roomtitle, 1);
        createAVoteForAPost(-1, user.username, item.id);
        setvtWeight(vtWeight - 1);
      }
    }
  }

  let isCommentPageLink;
  if (params.commentId) {
    isCommentPageLink = (
      <img
        className="m-2"
        width="15px"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Comment_alt_font_awesome.svg/512px-Comment_alt_font_awesome.svg.png"
        alt="fuckoff"
      />
    );
  } else {
    isCommentPageLink = (
      <a href={"/r/" + item.roomtitle + "/comments/" + item.id}>
        <img
          className="m-2"
          width="15px"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Comment_alt_font_awesome.svg/512px-Comment_alt_font_awesome.svg.png"
          alt="fuckoff"
        />
      </a>
    );
  }

  return (
    <div className="postCard">
      <div className="likedislike">
        <button className="voteBTN" onClick={(e) => handleUpVote(e)}>
          <img alt="fuckoff" className="upvoteIMG" src={upvote}></img>
        </button>
        {vote}
        <button className="voteBTN" onClick={(e) => handleDownVote(e)}>
          <img alt="fuckoff" className="downvoteIMG" src={downvote}></img>
        </button>
      </div>

      <Card key={item.id} style={{ width: "95%", marginTop: "10px" }}>
        <Card.Link
          className="mainPostCard"
          key={item.id + "card"}
          href={"/r/" + item.roomtitle + "/comments/" + item.id}
        >
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
              {item.postText}
            </Card.Title>
            <img
              alt="fuckoff"
              className="postImage"
              src={item.postImgURL}
            ></img>
          </Card.Body>
        </Card.Link>
        <Card.Footer className="d-flex justify-content-start p-2">
          {isCommentPageLink}
          <img
            className="m-2"
            width="15px"
            src="https://www.vhv.rs/dpng/d/520-5207678_viewing-svg-share-shared-icon-hd-png-download.png"
            alt="fuckoff"
          />
          {delbtn}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Post;
