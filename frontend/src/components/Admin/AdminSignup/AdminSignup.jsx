import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import classes from "./AdminSignup.module.css";

const AdminSignup = () => {
  const navigate = useNavigate();
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

    // Validation logic
    if (signupData.name.trim() === "") {
      toast.error("Enter Valid Name", { theme: "dark", autoClose: 1000 });
      return;
    }
    if (signupData.username.trim() === "") {
      toast.error("Enter Valid Username", { theme: "dark", autoClose: 1000 });
      return;
    }
    if (signupData.password.length < 6) {
      toast.error("Password must be greater than or equal to 6 characters", {
        theme: "dark",
        autoClose: 1000,
      });
      return;
    }
    if (signupData.tel.trim() === "") {
      toast.error("Enter Valid Contact Number", {
        theme: "dark",
        autoClose: 1000,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(
        "https://interest-mern-app-backend.vercel.app/authadminsignup",
        {
          method: "POST",
          body: JSON.stringify(signupData),
          headers: { "Content-Type": "application/json" },
        }
      );

      const res = await response.json();

      if (response.ok) {
        toast.success("Signup successful!", {
          theme: "dark",
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/admin/loginadmin");
        }, 1000);
      } else {
        const errorData = res.msg || "Signup failed. Please try again.";
        toast.error(errorData, { theme: "dark" });
      }
    } catch (err) {
      console.error("Error during signup:", err);
      toast.error("An error occurred. Please try again later.", {
        theme: "dark",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Container
        fluid
        className={`m-0 p-0 bg-black bg-opacity-75 ${classes.background}`}
      >
        <Row className="justify-content-center m-0 py-5">
          <Col
            sm={8}
            lg={4}
            md={6}
            className={`border border-3 border-warning rounded-5 p-3 ${classes.formBackground}`}
          >
            <h2 className="mb-4 text-center text-white">Sign Up</h2>
            <Form onSubmit={handleSubmit}>
              {/* Name Field */}
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label className="text-white">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={signupData.name}
                  onChange={(e) => onChangeHandler("name", e.target.value)}
                />
              </Form.Group>

              {/* Username Field */}
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label className="text-white">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={signupData.username}
                  onChange={(e) => onChangeHandler("username", e.target.value)}
                />
              </Form.Group>

              {/* Password Field */}
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={signupData.password}
                  onChange={(e) => onChangeHandler("password", e.target.value)}
                />
              </Form.Group>

              {/* Gender Dropdown */}
              <Form.Group className="mb-3" controlId="formGender">
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

              {/* Contact Number Field */}
              <Form.Group className="mb-3" controlId="formContactNumber">
                <Form.Label className="text-white">Contact Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter your contact number"
                  value={signupData.tel}
                  onChange={(e) => onChangeHandler("tel", e.target.value)}
                />
              </Form.Group>

              {/* Submit Button */}
              <Button
                variant="primary"
                type="submit"
                className="w-100 my-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Sign Up"}
              </Button>

              <h6 className="text-center text-white">
                Already have an account?{" "}
                <Button
                  className="text-primary border-0 bg-transparent text-decoration-underline"
                  onClick={() => navigate("/admin/loginadmin")}
                >
                  Login
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

export default AdminSignup;
