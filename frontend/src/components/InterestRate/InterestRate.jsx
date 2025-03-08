import React, { useContext, useState } from "react";
import { Form, Button, Container, Row, Col, Toast } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { ContextProvider } from "../../store/ContextApi";
import InterestRateNavigation from "./InterestRateNavigation/InterestRateNavigation";
import classes from "./InterestRate.module.css";
import InterestRateTableCalculation from "./InterestRateTableCalculation/InterestRateTableCalculation";
const InterestRate = ({ isLogin }) => {
  const { addInterestRateData } = useContext(ContextProvider);
  const [interestData, setInterestData] = useState({
    principal: "",
    rate: "",
    duration: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeHandle = (identifier, value) => {
    setInterestData({ ...interestData, [identifier]: value });
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!interestData.principal) {
      toast.error("Enter principal amount", { theme: "dark", autoClose: 1000 });
      return;
    }
    if (!interestData.rate) {
      toast.error("Enter interest rate", { theme: "dark", autoClose: 1000 });
      return;
    }
    if (!interestData.duration) {
      toast.error("Enter duration", { theme: "dark", autoClose: 1000 });
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You need to be logged in to calculate interest.", {
        theme: "dark",
        autoClose: 1000,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(
        "https://interest-app-backend.vercel.app/calculateInterestRate",
        {
          method: "POST",
          body: JSON.stringify({
            ...interestData,
            userId: localStorage.getItem("id"),
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"), // Fixed authorization header
          },
        }
      );

      const res = await response.json();
      setIsSubmitting(false);

      if (response.ok) {
        toast.success(`Interest calculated successfully`, {
          theme: "dark",
          autoClose: 500,
        });
        // Reset the form
        setInterestData({
          principal: "",
          rate: "",
          duration: "",
        });
        addInterestRateData(res);
        console.log(res);
      } else {
        const msg = res.msg || "Calculation failed. Please try again.";
        toast.error(msg, { theme: "dark", autoClose: 1000 });
      }
    } catch (err) {
      setIsSubmitting(false);
      toast.error("An error occurred. Please try again later.", {
        theme: "dark",
        autoClose: 1000,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      isLogin(true);
    }
  };

  return (
    <>
      <InterestRateNavigation />
      <Container
        fluid
        className={`m-0 p-0 bg-black bg-opacity-75 p-4 ${classes.background}`}
      >
        <Row className="justify-content-center w-100">
          <Col
            sm={8}
            lg={4}
            md={6}
            className={`border border-3 border-warning rounded-5 p-3 ${classes.formBackground}`}
          >
            <h2 className="mb-4 text-center text-white">Interest Rate</h2>
            <Form onSubmit={submitHandle}>
              {/* Principal Field */}
              <Form.Group className="mb-3" controlId="formPrincipal">
                <Form.Label className="text-white">Principal Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter principal amount"
                  value={interestData.principal}
                  onChange={(e) => onChangeHandle("principal", e.target.value)}
                />
              </Form.Group>

              {/* Interest Rate Field */}
              <Form.Group className="mb-3" controlId="formInterestRate">
                <Form.Label className="text-white">
                  Interest Rate (%)
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter interest rate"
                  value={interestData.rate}
                  onChange={(e) => onChangeHandle("rate", e.target.value)}
                />
              </Form.Group>

              {/* Duration Field */}
              <Form.Group className="mb-3" controlId="formDuration">
                <Form.Label className="text-white">Duration (Years)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter duration in years"
                  value={interestData.duration}
                  onChange={(e) => onChangeHandle("duration", e.target.value)}
                />
              </Form.Group>

              {/* Submit Button */}
              <Button variant="primary" type="submit" className="w-100 my-4">
                {isSubmitting
                  ? "Calculating interest..."
                  : "Calculate Interest"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <ToastContainer />
      <InterestRateTableCalculation />
    </>
  );
};

export default InterestRate;
