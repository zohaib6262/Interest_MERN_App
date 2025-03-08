import React, { useContext, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContextProvider } from "../../../store/ContextApi";

const SignupForm = () => {
  const { changeUserLoginHandle } = useContext(ContextProvider);
  const [signupData, setSignupData] = useState({
    name: "",
    username: "",
    password: "",
    gender: "male",
    tel: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeHandler = (identifier, value) => {
    setSignupData({ ...signupData, [identifier]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      signupData.name.trim() === "" ||
      signupData.username.trim() === "" ||
      signupData.password.length < 6 ||
      signupData.tel.trim() === ""
    ) {
      toast.error("Please fill all fields correctly", {
        theme: "dark",
        autoClose: 1000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://interest-mern-app-backend.vercel.app/authsignup",
        {
          method: "POST",
          body: JSON.stringify(signupData),
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "John",
            username: "john123",
            password: "password123",
            tel: "123456789",
            gender: "Male",
          }),
        }
      );
      setIsSubmitting(false);
      if (response.ok) {
        toast.success("Signup successful!", { theme: "dark", autoClose: 2000 });
        setTimeout(() => changeUserLoginHandle(true), 2000);
        setIsSubmitting(false);

        return;
      } else {
        toast.error("Signup failed. Please try again.", { theme: "dark" });
        setIsSubmitting(false);

        return;
      }
    } catch (err) {
      setIsSubmitting(false);
      toast.error("An error occurred. Please try again later.", {
        theme: "dark",
      });
      return;
    }
  };

  return (
    <>
      <h2 className="mb-4 text-center text-white">Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={signupData.name}
                onChange={(e) => onChangeHandler("name", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Username</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your username"
                value={signupData.username}
                onChange={(e) => onChangeHandler("username", e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Gender</Form.Label>
              <Form.Select
                aria-label="Select gender"
                value={signupData.gender}
                onChange={(e) => onChangeHandler("gender", e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Contact Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your contact number"
                value={signupData.tel}
                onChange={(e) => onChangeHandler("tel", e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label className="text-white">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={signupData.password}
            onChange={(e) => onChangeHandler("password", e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 my-4">
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </Button>

        <h6 className="text-center text-white">
          Already have an account?{" "}
          <Button
            className="text-primary border-0 bg-transparent text-decoration-underline"
            onClick={() => changeUserLoginHandle(true)}
          >
            Login
          </Button>
        </h6>
      </Form>
      <ToastContainer />
    </>
  );
};

export default SignupForm;
