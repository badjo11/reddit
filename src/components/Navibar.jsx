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

const Navibar = () => {
  const { state, logoutUser, setUser } = useContext(mainContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  let button;

  function logout() {
    logoutUser();
    localStorage.clear();
  }

  if (state.user) {
    // console.log(state.user.username)
    let struser = JSON.stringify(state.user);
    localStorage.setItem("user", struser);
    button = (
      <>
        <Navbar.Collapse
          className="justify-content-end me-2 navbar"
          style={{ maxWidth: "200px" }}
        >
          <Navbar.Text>
            Signed in as: <Badge bg="secondary">{state.user.username}</Badge>
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
        <Button className="me-2 text-success" variant="outline-dark" onClick={handleShowLogin}>
          Log In
        </Button>
        <Button className="me-2 text-success" variant="outline-dark" onClick={handleShow}>
          Sign Up
        </Button>
      </>
    );
  }

  let struser = localStorage.getItem("user");
  function setuser() {
    if (struser) {
      setUser(JSON.parse(struser));
    }
  }
  useEffect(() => setuser(), [struser]);

  return (
    <Navbar className="nav" bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            width="80px"
            src="https://www.logo.wine/a/logo/Reddit/Reddit-Logo.wine.svg"
            alt="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          <FormControl
            type="search"
            placeholder="Search"
            className="mx-auto  "
            aria-label="Search"
            style={{ maxWidth: "700px", textAlign: "center", }}
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
