import React, { useContext, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import classes from "./AdminLogin.module.css";
import { useNavigate } from "react-router-dom";
import { ContextProvider } from "../../../store/ContextApi";
const AdminLogin = () => {
  const { addAdminToken } = useContext(ContextProvider);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeHandler = (identifier, value) => {
    setLoginData({ ...loginData, [identifier]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    if (loginData.username.trim() === "") {
      toast.error("Enter a valid username", { theme: "dark", autoClose: 1000 });
      return;
    }
    if (loginData.password.length < 6) {
      toast.error("Password must be greater than or equal to 6 characters", {
        theme: "dark",
        autoClose: 1000,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(
        "https://interest-app-backend.vercel.app/authadminlogin",
        {
          method: "POST",
          body: JSON.stringify(loginData),
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);

      setIsSubmitting(false);
      const res = await response.json();

      if (response.ok) {
        toast.success("Login successful!", {
          theme: "dark",
          autoClose: 1000,
        });
        setTimeout(() => {
          localStorage.setItem("adminToken", res.token);
          localStorage.setItem("adminId", res.id);
          addAdminToken(res.token);
          navigate("/admin/userlist");
        }, 1000);
        // setIsToken(res.token);
      } else {
        const errorData = res.msg || "Login failed. Please try again.";
        toast.error(errorData, { theme: "dark" });
      }
    } catch (err) {
      setIsSubmitting(false);
      toast.error("An error occurred. Please try again later.", {
        theme: "dark",
      });
    }
  };

  return (
    <>
      <Container
        fluid
        className={`m-0 p-0 bg-black bg-opacity-75 p-4 ${classes.background}`}
      >
        <Row className="justify-content-center m-0">
          <Col
            sm={8}
            lg={4}
            md={6}
            className={`border border-3 border-warning rounded-5 p-3 ${classes.formBackground}`}
          >
            <h2 className="mb-4 text-center text-white">Login</h2>
            <Form onSubmit={handleSubmit}>
              {/* Username Field */}
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label className="text-white">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={loginData.username}
                  onChange={(e) => onChangeHandler("username", e.target.value)}
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
                />
              </Form.Group>

              {/* Submit Button */}
              <Button variant="primary" type="submit" className="w-100 my-4">
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>

              {/* <h6 className="text-center text-white">
                Don't have an account?{" "}
                <Button
                  className="text-primary border-0 bg-transparent text-decoration-underline"
                  onClick={() => navigate("/admin/signupadmin")}
                >
                  Sign up
                </Button>
              </h6> */}
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
      <ToastContainer />
    </>
  );
};

export default AdminLogin;
