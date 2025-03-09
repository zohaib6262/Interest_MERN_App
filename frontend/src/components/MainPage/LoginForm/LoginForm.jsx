import React, { useContext, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { ContextProvider } from "../../../store/ContextApi";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToken, changeUserLoginHandle } = useContext(ContextProvider);

  // Handle changes to form fields
  const onChangeHandler = (identifier, value) => {
    setLoginData({ ...loginData, [identifier]: value.trim() });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    // Username validation (email pattern)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(loginData.username)) {
      toast.error("Enter a valid email address", {
        theme: "dark",
        autoClose: 1000,
      });
      return;
    }

    // Password validation (minimum 6 characters)
    if (loginData.password.length < 6) {
      toast.error("Password must be greater than or equal to 6 characters", {
        theme: "dark",
        autoClose: 1000,
      });
      return;
    }

    setIsSubmitting(true); // Start submitting state

    try {
      // Sending POST request to backend for login
      const response = await fetch(
        "https://interest-mern-app-backend.vercel.app/authlogin",
        {
          method: "POST", // Changed from GET to POST
          body: JSON.stringify(loginData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsSubmitting(false); // End submitting state
      const res = await response.json();

      if (response.ok) {
        toast.success("Login successful!", { theme: "dark", autoClose: 600 });

        // Save token and id to localStorage
        setTimeout(() => {
          localStorage.setItem("token", res.token);
          localStorage.setItem("id", res.id);
          addToken(res.token);
          navigate("interestrate"); // Navigate to 'interestrate' page
        }, 500);
        return;
      } else {
        // Show error if login fails
        const errorData =
          res.msg || res.error || "Login failed. Please try again.";
        toast.error(errorData, { theme: "dark" });
        return;
      }
    } catch (err) {
      setIsSubmitting(false); // End submitting state
      toast.error("An error occurred. Please try again later.", {
        theme: "dark",
      });
      return;
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100">
          <Col md={6} lg={4}>
            <h2 className="mb-4 text-center text-white">Login</h2>
            <Form onSubmit={handleSubmit}>
              {/* Username Field */}
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label className="text-white">Username (Email)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username (email)"
                  value={loginData.username}
                  onChange={(e) => onChangeHandler("username", e.target.value)}
                  aria-label="Username"
                />
              </Form.Group>

              {/* Password Field */}
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) => onChangeHandler("password", e.target.value)}
                  aria-label="Password"
                />
              </Form.Group>

              {/* Submit Button */}
              <Button
                variant="primary"
                type="submit"
                className="w-100 my-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>

              {/* Signup Redirect */}
              <h6 className="text-center text-white">
                Don't have an account?{" "}
                <Button
                  className="text-primary border-0 bg-transparent text-decoration-underline"
                  onClick={() => changeUserLoginHandle(false)}
                >
                  Sign up
                </Button>
              </h6>
            </Form>
          </Col>
        </Row>
      </Container>

      <ToastContainer />
    </>
  );
};

export default LoginForm;
