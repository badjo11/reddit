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
import LogInModal from "./auth/LogInModal";


const Navibar = () => {
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
          <Button variant="outline-primary">SignUp</Button>
        </Navbar.Collapse>
      </Container>
      <LogInModal handleCloseLogin={handleCloseLogin} showLogin={showLogin} />
    </Navbar>
  );
};

export default Navibar;
