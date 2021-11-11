import React, { useState, useContext, useEffect } from "react";
import {
  Navbar,
  FormControl,
  Button,
  Nav,
  Container,
  Badge,
} from "react-bootstrap";
import SignUpModal from "./auth/SignUpModal";
import LogInModal from "./auth/LogInModal";
import { mainContext } from "../contexts/MainContext";
import { postsContext } from "../contexts/PostsContext";
import { roomsContext } from "../contexts/RoomsContext";
import { Link } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";

const Navibar = () => {
  const { user, logOut } = useContext(authContext);
  console.log(user);
  const { getPostSearching, wipeCleanSearchResults, searchResPost } =
    useContext(postsContext);
  const { getRoomSearching, searchRoom, wipeCleanSearchResultsRoom } =
    useContext(roomsContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  let button;
  const [event, setEvent] = useState();

  let searchResList;
  function hanldeChange(e) {
    if (e.target.value.length >= 2) {
      getPostSearching(e.target.value);
      getRoomSearching(e.target.value);
      setEvent(e.target.value);
    } else {
      wipeCleanSearchResults();
      wipeCleanSearchResultsRoom();
    }
  }

  function handleDispayDropDown() {
    wipeCleanSearchResults();
    wipeCleanSearchResultsRoom();
  }

  if (searchRoom.length > 0 || searchResPost.length > 0) {
    searchResList = (
      <div className="dropdown-div" style={{ display: "block" }}>
        <h2 style={{ color: "white", background: "#373940" }}>Rooms</h2>
        <ul>
          {searchRoom
            ? searchRoom.map((item) => {
                let index = item.roomtitle.toLowerCase().indexOf(event);
                let temp = item.roomtitle.slice(0, index);
                let temp1 = (
                  <span style={{ backgroundColor: "yellow" }}>{event}</span>
                );
                let temp2 = item.roomtitle.slice(index + event.length);
                return (
                  <Link key={item.id} to={"/r/" + item.roomtitle}>
                    <li>
                      {temp}
                      {temp1}
                      {temp2}
                    </li>
                  </Link>
                );
              })
            : null}
        </ul>

        <h2 style={{ color: "white", background: "#373940" }}>Posts</h2>
        <ul>
          {searchResPost
            ? searchResPost.map((item) => {
                let index = item.postText.toLowerCase().indexOf(event);
                let temp = item.postText.slice(0, index);
                let temp1 = (
                  <span style={{ backgroundColor: "yellow" }}>{event}</span>
                );
                let temp2 = item.postText.slice(index + event.length);
                return (
                  <Link
                    key={item.id}
                    to={"/r/" + item.roomtitle + "/comments/" + item.id}
                  >
                    <li>
                      {temp}
                      {temp1}
                      {temp2}
                    </li>
                  </Link>
                );
              })
            : null}
        </ul>
      </div>
    );
  } else {
    searchResList = (
      <div className="dropdown-div" style={{ display: "none" }}></div>
    );
  }

  searchResList = (
    <div className="dropdown-div" style={{ display: "none" }}></div>
  );

  function logout() {
    logOut();
    localStorage.clear();
  }

  if (user) {
    localStorage.setItem("uid", user.uid);
    button = (
      <>
        <Navbar.Collapse
          className="justify-content-end me-2 navbar"
          style={{ maxWidth: "200px" }}
        >
          <Navbar.Text>
            <Badge bg="secondary">{user.email}</Badge>
          </Navbar.Text>
        </Navbar.Collapse>
        <Button className="me-2" variant="primary" onClick={() => logout()}>
          Logout
        </Button>
      </>
    );
  } else {
    button = (
      <>
        <Button
          className="me-2 text-success"
          variant="outline-dark"
          onClick={handleShowLogin}
        >
          Log In
        </Button>
        <Button
          className="me-2 text-success"
          variant="outline-dark"
          onClick={handleShow}
        >
          Sign Up
        </Button>
      </>
    );
  }

  return (
    <Navbar className="nav" bg="light" expand="lg">
      <Container fluid>
        <Link className="navbar-brand" to="/">
          <img
            width="80px"
            src="https://www.logo.wine/a/logo/Reddit/Reddit-Logo.wine.svg"
            alt="logo"
          />
        </Link>
        {/* <Navbar.Brand href="/">
        </Navbar.Brand> */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          {searchResList}
          <FormControl
            type="search"
            placeholder="Search"
            className="mx-auto"
            aria-label="Search"
            style={{ maxWidth: "700px", textAlign: "center" }}
            onChange={hanldeChange}
            onBlur={() => {
              handleDispayDropDown();
            }}
          />
          {button}
        </Navbar.Collapse>
      </Container>
      <SignUpModal handleClose={handleClose} show={show} />
      <LogInModal handleCloseLogin={handleCloseLogin} showLogin={showLogin} />
    </Navbar>
  );
};

export default Navibar;
