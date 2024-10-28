import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import classes from "./Contactus.module.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Contactus = () => {
  const navigate = useNavigate();

  // State to handle form data (optional if you want to use the data)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name.trim() === "") {
      toast.error("Invalid Name");
    }
    if (
      !formData.email ||
      formData.email.trim() === "" ||
      !formData.email.includes("@" || "gmail.com")
    ) {
      toast.error("Invalid Email");
    }
    if (formData.subject.trim() === "" || !formData.subject) {
      toast.error("Invalid subject");
    }
    if (formData.message.trim() === "" || !formData.message) {
      toast.error("Invalid message");
    }

    toast.success("Data successfully entered!");

    console.log("Form Data: ", formData);
    setFormData({ email: "", name: "", subject: "", message: "" });
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Container className={`py-5 w-100 ${classes.contactBackground}`} fluid>
        <h2 className="text-center mb-4">Contact Us</h2>
        <p className="text-center mb-5">We'd love to hear from you!</p>

        <Row className="justify-content-around">
          {/* Contact Form */}
          <Col lg={5} md={6} className="mb-4">
            <Form className={`w-100 ${classes.form}`} onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formSubject" className="mt-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formMessage" className="mt-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Write your message here"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-4 w-100">
                Send Message
              </Button>
            </Form>
          </Col>

          {/* Contact Details */}
          <Col lg={5} md={6}>
            <div className={`w-100 ${classes.contactInfo}`}>
              <FaPhone
                size={30}
                className={`me-3 ${classes.icon}`}
                aria-label="Phone"
              />
              <span>+1 123-456-7890</span>
            </div>
            <div className={classes.contactInfo}>
              <FaEnvelope
                size={30}
                className={`me-3 ${classes.icon}`}
                aria-label="Email"
              />
              <span>support@interestcalc.com</span>
            </div>
            <div className={classes.contactInfo}>
              <FaMapMarkerAlt
                size={30}
                className={`me-3 ${classes.icon}`}
                aria-label="Address"
              />
              <span>123 Finance Street, New York, NY</span>
            </div>
            <div className={classes.contactInfo}>
              <strong>Operating Hours:</strong>
              <span> 9 AM - 6 PM (Mon - Fri)</span>
            </div>
          </Col>
        </Row>
      </Container>

      <ToastContainer autoClose={1000} theme="dark" />
    </>
  );
};

export default Contactus;
