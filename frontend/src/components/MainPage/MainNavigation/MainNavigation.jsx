import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import Logo from "../../Logo/Logo";

function MainNavigation() {
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { threshold: 0.7 } // Adjust threshold as needed
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-white" sticky="top">
      <Container>
        <NavLink>
          <Logo />
        </NavLink>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="border border-warning bg-warning text-none"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto d-flex justify-content-evenly">
            <NavLink
              className={`text-black text-decoration-none me-5 ${
                activeLink === "home"
                  ? "bg-warning text-white p-2 rounded-2"
                  : "p-2"
              }`}
            >
              Home
            </NavLink>
            <NavLink
              className={`text-black text-decoration-none me-5 ${
                activeLink === "aboutus"
                  ? "bg-warning text-white p-2 rounded-2"
                  : "p-2"
              }`}
            >
              About Us
            </NavLink>
            <NavLink
              className={`text-black text-decoration-none me-5 ${
                activeLink === "services"
                  ? "bg-warning text-white p-2 rounded-2"
                  : "p-2"
              }`}
            >
              Services
            </NavLink>
            <NavLink
              className={`text-black text-decoration-none me-5 ${
                activeLink === "contactus"
                  ? "bg-warning text-white p-2 rounded-2"
                  : "p-2"
              }`}
            >
              Contact Us
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;
