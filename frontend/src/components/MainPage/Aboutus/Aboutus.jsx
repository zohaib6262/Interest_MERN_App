import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import AboutusImg from "../../../assets/aboutus.jpg";
import Men1 from "../../../assets/men-1.jpg";
import Men2 from "../../../assets/men-2.jpg";
import Men3 from "../../../assets/men-3.jpg";

const Aboutus = () => {
  return (
    <Container className="py-5 about-container">
      {/* Section Heading */}
      <Row className="text-center mb-4">
        <Col>
          <h2 className="fw-bold section-title">About Us</h2>
          <p className="text-muted section-subtitle">
            Learn more about our mission, vision, and the team behind this
            platform.
          </p>
        </Col>
      </Row>

      {/* About Section */}
      <Row className="align-items-center">
        <Col md={6} className="text-center">
          <img
            src={AboutusImg}
            alt="About Us"
            className="img-fluid rounded-3 shadow"
          />
        </Col>
        <Col md={6}>
          <h3 className="fw-semibold">Who We Are</h3>
          <p className="text-muted">
            We are a passionate team dedicated to providing seamless financial
            tracking solutions. Our goal is to make investment and savings
            management easy for everyone.
          </p>
          <h3 className="fw-semibold">Our Mission</h3>
          <p className="text-muted">
            Empower users with smart financial tools to help them achieve their
            monetary goals efficiently and securely.
          </p>
        </Col>
      </Row>

      {/* Team Section */}
      <Row className="mt-5">
        <Col className="text-center">
          <h3 className="fw-bold">Meet Our Team</h3>
          <p className="text-muted">
            Our team is dedicated to innovation and excellence.
          </p>
        </Col>
      </Row>

      {/* Team Cards */}
      <Row className="mt-3">
        {[
          {
            name: "John Doe",
            role: "CEO & Founder",
            img: Men1,
          },
          {
            name: "Jane Smith",
            role: "CTO",
            img: Men2,
          },
          {
            name: "Michael Lee",
            role: "Lead Developer",
            img: Men3,
          },
        ].map((member, index) => (
          <Col md={4} key={index}>
            <Card className="border-0 shadow-lg about-card text-center">
              <Card.Img
                variant="top"
                src={member.img}
                className="rounded-top"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title className="fw-semibold">{member.name}</Card.Title>
                <Card.Text className="text-muted">{member.role}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Aboutus;
