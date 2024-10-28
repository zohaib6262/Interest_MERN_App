import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SignupForm from "../../MainPage/SignupForm/SignupForm";
import LoginForm from "../../MainPage/LoginForm/LoginForm";
import classes from "./Home.module.css";
import { ContextProvider } from "../../../store/ContextApi";

const Home = () => {
  const { addToken, isUserLogin } = useContext(ContextProvider);

  useEffect(() => {
    const tokenVal = localStorage?.getItem("token");
    addToken(tokenVal);
  }, []);

  return (
    <Container
      fluid
      className={`m-0 p-0 bg-black bg-opacity-75 p-4 ${classes.background}`}
    >
      <Row className="justify-content-around align-items-center">
        {/* Left Section */}
        <Col lg={6} md={6}>
          {!isUserLogin ? (
            <>
              <h3 className="text-warning display-4 fw-bold">
                Welcome,{" "}
                <span className="text-white">
                  Our Interest Rate Calculator!
                </span>
              </h3>
              <p
                className="text-white pt-4 lh-lg"
                style={{ lineHeight: "1.8", fontSize: "1.1rem" }}
              >
                Managing your finances effectively starts with understanding how
                interest rates impact your savings, loans, and investments. Our
                easy-to-use Interest Rate Calculator empowers you to make
                informed financial decisions with just a few clicks. Whether
                you’re calculating the interest on a loan, estimating returns on
                savings, or exploring investment options, we’ve got you covered.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-warning display-4 fw-bold">
                Welcome Back!{" "}
                <span className="text-white">Login to Your Account</span>
              </h3>
              <p
                className="text-white pt-4 lh-lg"
                style={{ lineHeight: "1.8", fontSize: "1.1rem" }}
              >
                Access your personalized dashboard, manage your finances, and
                keep track of your interest rates and investments. Logging in
                gives you a seamless experience with features like:
              </p>
              <ul
                className="text-white"
                style={{ lineHeight: "1.8", fontSize: "1.1rem" }}
              >
                <li>Track your financial progress in real-time</li>
                <li>Access exclusive insights and calculators</li>
                <li>Manage savings and loans effectively</li>
                <li>Secure and private platform for all users</li>
              </ul>
              <p className="text-white pt-4" style={{ fontSize: "1.1rem" }}>
                Don't miss out on managing your future. If you don’t have an
                account, feel free to sign up to enjoy these amazing tools and
                benefits.
              </p>
            </>
          )}
        </Col>

        {/* Right Section - Signup/Login Form */}
        <Col
          lg={4}
          md={6}
          xs={12}
          className={`border border-3 border-warning rounded-5 p-4 bg-light bg-opacity-10`}
        >
          {!isUserLogin ? <SignupForm /> : <LoginForm />}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
