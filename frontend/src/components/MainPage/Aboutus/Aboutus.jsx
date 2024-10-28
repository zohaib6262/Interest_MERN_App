import React from "react";
import { Container } from "react-bootstrap";
import classes from "./Aboutus.module.css";
const Aboutus = () => {
  return (
    <Container fluid className={`p-0 h-75 min-vh-100 ${classes.background}`}>
      <h2 className="text-center text-bg-danger p-2 text-white">About us</h2>
    </Container>
  );
};

export default Aboutus;
