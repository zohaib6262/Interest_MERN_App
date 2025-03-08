import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import {
  FaCalculator,
  FaExchangeAlt,
  FaChartLine,
  FaUserTie,
} from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import classes from "./Services.module.css"; // Import the styles as a module

const Services = () => {
  const navigate = useNavigate();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: { breakpoint: { max: 1024, min: 600 }, items: 2, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 600, min: 0 }, items: 1, slidesToSlide: 1 },
  };

  const services = [
    {
      icon: <FaCalculator size={50} />,
      title: "Interest Rate Calculator",
      description:
        "Easily calculate your loan repayments and understand how interest rates affect your financial obligations.",
      link: "/calculator",
    },
    {
      icon: <FaExchangeAlt size={50} />,
      title: "Loan Comparison Tool",
      description:
        "Compare different loan products to find the best interest rates and terms that suit your needs.",
      link: "/comparison",
    },
    {
      icon: <FaChartLine size={50} />,
      title: "Investment Interest Analysis",
      description:
        "Analyze potential returns on investments by evaluating different interest rates and timeframes.",
      link: "/investment-analysis",
    },
    {
      icon: <FaUserTie size={50} />,
      title: "Personal Finance Consultation",
      description:
        "Get personalized advice from our financial experts to help you navigate your financial journey.",
      link: "/consultation",
    },
  ];

  return (
    <Container fluid className={classes.servicesSection}>
      <h2 className={`text-center ${classes.sectionTitle}`}>Our Services</h2>
      <p className={`text-center ${classes.sectionSubtitle}`}>
        Empowering Your Financial Decisions
      </p>

      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        containerClass={classes.carouselContainer}
      >
        {services.map((service, index) => (
          <Card key={index} className={`${classes.serviceCard} shadow`}>
            <Card.Body className="text-center">
              <div className={classes.serviceIcon}>{service.icon}</div>
              <Card.Title className={classes.serviceTitle}>
                {service.title}
              </Card.Title>
              <Card.Text className={classes.serviceDescription}>
                {service.description}
              </Card.Text>
              <Button
                variant="warning"
                className={`${classes.customBtn} text-white`}
                href={service.link}
              >
                Learn More
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Carousel>

      <div className="text-center mt-5">
        <h3>Ready to take control of your finances?</h3>
        <Button
          variant="warning"
          className={`${classes.customBtnLg} text-white`}
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
