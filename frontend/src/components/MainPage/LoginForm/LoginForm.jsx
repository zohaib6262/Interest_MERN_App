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

  const onChangeHandler = (identifier, value) => {
    setLoginData({ ...loginData, [identifier]: value.trim() });
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
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://interest-mern-app-backend.vercel.app/authlogin",
        {
          method: "GET",
          body: JSON.stringify(loginData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsSubmitting(false);
      const res = await response.json();

      if (response.ok) {
        toast.success("Login successful!", {
          theme: "dark",
          autoClose: 600,
        });
        setTimeout(() => {
          localStorage.setItem("token", res.token);
          localStorage.setItem("id", res.id);
          addToken(res.token);
          navigate("interestrate");
        }, 500);
        // setIsToken(res.token);return;
        return;
      } else {
        const errorData = res.msg || "Login failed. Please try again.";
        toast.error(errorData, { theme: "dark" });
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

      <ToastContainer />
    </>
  );
};

export default LoginForm;
