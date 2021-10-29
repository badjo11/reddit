import React, { useState, useContext } from "react";
import {
  Navbar,
  Form,
  FormControl,
  Button,
  Nav,
  Container,
  NavDropdown,
  Badge,
} from "react-bootstrap";
import SignUpModal from "./auth/SignUpModal";
import LogInModal from "./auth/LogInModal";
import { mainContext } from "../contexts/MainContext";

const Navibar = () => {
  const { state, logoutUser } = useContext(mainContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  let button;
  let text;
  if (state.user) {
    // console.log(state.user.username)
    button = (
      <>
        <Navbar.Collapse className="justify-content-end me-2" style={{ maxWidth: "200px" }}>
          <Navbar.Text>
            Signed in as: <Badge bg="secondary">{state.user.username}</Badge>
          </Navbar.Text>
        </Navbar.Collapse>
        <Button className="me-2" variant="primary" onClick={() => logoutUser()}>
          Logout
        </Button>
      </>
    );
  } else {
    button = (
      <>
        <Button className="me-2" variant="primary" onClick={handleShowLogin}>
          LogIn
        </Button>
        <Button variant="outline-primary" onClick={handleShow}>
          SignUp
        </Button>
      </>
    );
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          {" "}
          <img
            width="70px"
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
            className="mx-auto "
            aria-label="Search"
            style={{ maxWidth: "700px", textAlign: "center" }}
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
