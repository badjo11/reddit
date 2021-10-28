import React, { useState } from "react";
import {
  Navbar,
  Form,
  FormControl,
  Button,
  Nav,
  Container,
  NavDropdown,
} from "react-bootstrap";
import SignUpModal from "./auth/SignUpModal";
import LogInModal from "./auth/LogInModal";

const Navibar = () => {
  // <img width="70px" src="https://www.logo.wine/a/logo/Reddit/Reddit-Logo.wine.svg" alt="logo" />
  //test

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
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
            className="me-2"
            aria-label="Search"
          />
          <Button className="me-2" variant="primary" onClick={handleShowLogin}>
            LogIn
          </Button>
          <Button variant="outline-primary" onClick={handleShow}>
            SignUp
          </Button>
        </Navbar.Collapse>
      </Container>
      <SignUpModal handleClose={handleClose} show={show} />
      <LogInModal handleCloseLogin={handleCloseLogin} showLogin={showLogin} />
    </Navbar>
  );
};

export default Navibar;
