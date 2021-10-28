import React from "react";
import {
  Navbar,
  Form,
  FormControl,
  Button,
  Nav,
  Container,
  NavDropdown,
} from "react-bootstrap";
const Navibar = () => {
  // <img width="70px" src="https://www.logo.wine/a/logo/Reddit/Reddit-Logo.wine.svg" alt="logo" />
  //test
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

          <Button className="me-2" variant="primary">
            LogIn
          </Button>
          <Button variant="outline-primary">SignUp</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navibar;
