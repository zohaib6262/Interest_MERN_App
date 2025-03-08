import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Aboutus = () => {
  return (
    <Container className="py-5">
      <Row className="text-center mb-4">
        <Col>
          <h2 className="fw-bold">About Us</h2>
          <p className="text-muted">
            Learn more about our mission, vision, and the team behind this
            platform.
          </p>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={6}>
          <img
            src="https://via.placeholder.com/500"
            alt="About Us"
            className="img-fluid rounded"
          />
        </Col>
        <Col md={6}>
          <h3>Who We Are</h3>
          <p>
            We are a passionate team dedicated to providing seamless financial
            tracking solutions. Our goal is to make investment and savings
            management easy for everyone.
          </p>
          <h3>Our Mission</h3>
          <p>
            Empower users with smart financial tools to help them achieve their
            monetary goals efficiently and securely.
          </p>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="text-center">
          <h3>Meet Our Team</h3>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Img variant="top" src="https://via.placeholder.com/150" />
            <Card.Body>
              <Card.Title>John Doe</Card.Title>
              <Card.Text>CEO & Founder</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Img variant="top" src="https://via.placeholder.com/150" />
            <Card.Body>
              <Card.Title>Jane Smith</Card.Title>
              <Card.Text>CTO</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Img variant="top" src="https://via.placeholder.com/150" />
            <Card.Body>
              <Card.Title>Michael Lee</Card.Title>
              <Card.Text>Lead Developer</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Aboutus;
