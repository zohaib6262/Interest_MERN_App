import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import {
  FaCalculator,
  FaExchangeAlt,
  FaChartLine,
  FaUserTie,
} from "react-icons/fa";
import classes from "./Services.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Services = () => {
  const navigate = useNavigate();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // Slide one card at a time
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <Container
      className={`m-0 p-0 py-5 ${classes.background} text-white`}
      fluid
    >
      <h2 className="text-center text-white mb-4">Our Services</h2>
      <p className="text-center text-white mb-5">
        Empowering Your Financial Decisions
      </p>
      <Carousel
        responsive={responsive}
        // ssr={true} // Server-side rendering
        infinite={true} // Infinite scrolling
        autoPlay={true} // Auto play
        autoPlaySpeed={3000} // Slide every 3 seconds
        // keyBoardControl={true} // Allow keyboard navigation
        containerClass="carousel-container"
        // removeArrowOnDeviceType={["tablet", "mobile"]}

        dotListClass="custom-dot-list-style"
        // itemClass="carousel-item-padding-40-px"
      >
        <Card className="h-100 shadow text-center m-5">
          <Card.Body>
            <FaCalculator size={50} className="mb-3" />
            <Card.Title>Interest Rate Calculator</Card.Title>
            <Card.Text>
              Easily calculate your loan repayments and understand how interest
              rates affect your financial obligations.
            </Card.Text>
            <Button variant="warning" className="text-white" href="/calculator">
              Learn More
            </Button>
          </Card.Body>
        </Card>

        <Card className="h-100 shadow text-center m-5">
          <Card.Body>
            <FaExchangeAlt size={50} className="mb-3" />
            <Card.Title>Loan Comparison Tool</Card.Title>
            <Card.Text>
              Compare different loan products to find the best interest rates
              and terms that suit your needs.
            </Card.Text>
            <Button variant="warning" className="text-white" href="/comparison">
              Learn More
            </Button>
          </Card.Body>
        </Card>

        <Card className="h-100 shadow text-center m-5">
          <Card.Body>
            <FaChartLine size={50} className="mb-3" />
            <Card.Title>Investment Interest Analysis</Card.Title>
            <Card.Text>
              Analyze potential returns on investments by evaluating different
              interest rates and timeframes.
            </Card.Text>
            <Button
              variant="warning"
              className="text-white"
              href="/investment-analysis"
            >
              Learn More
            </Button>
          </Card.Body>
        </Card>

        <Card className="h-100 shadow text-center m-5">
          <Card.Body>
            <FaUserTie size={50} className="mb-3" />
            <Card.Title>Personal Finance Consultation</Card.Title>
            <Card.Text>
              Get personalized advice from our financial experts to help you
              navigate your financial journey.
            </Card.Text>
            <Button
              variant="warning"
              className="text-white"
              href="/consultation"
            >
              Learn More
            </Button>
          </Card.Body>
        </Card>
      </Carousel>

      <div className="text-center mt-5">
        <h3>Ready to take control of your finances?</h3>
        <Button
          variant="warning"
          className="text-white"
          size="lg"
          onClick={() => {
            if (localStorage?.getItem("token")) {
              navigate("/interestrate");
            } else {
              toast.error("Please log in to use the calculator.", {
                autoClose: 1000,
                theme: "dark",
              });
            }
          }}
        >
          Use Our Calculator
        </Button>
      </div>
    </Container>
  );
};

export default Services;
