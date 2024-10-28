import React from "react";
import Logout from "../../Logout/Logout";
import { Container, Nav, Navbar } from "react-bootstrap";
import Logo from "../../Logo/Logo";
import { Link } from "react-router-dom";

const InterestRateNavigation = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-dark">
        <Container>
          <Navbar.Brand href="#home">
            <Logo />
          </Navbar.Brand>
          {/* <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="border border-warning bg-warning text-none"
          /> */}
          {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
          {/* <Nav className="ms-auto d-flex justify-content-evenly">
            
          </Nav> */}

          {/* </Navbar.Collapse> */}
          <Nav>
            <Logout />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default InterestRateNavigation;
