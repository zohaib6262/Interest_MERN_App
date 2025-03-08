import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Aboutus = () => {
  return (
    <Container className="about-container text-center py-5">
      <h2 className="section-title">About Us</h2>
      <p className="section-subtitle">Who we are and what we do</p>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="about-card p-4">
            <Card.Body>
              <Card.Text>
                Welcome to InterestCalc, where we simplify financial decisions
                for individuals and businesses. Our expert team helps you find
                the best interest rates, optimize investments, and plan your
                financial future with confidence.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Aboutus;
