import React from "react";
import Contactus from "./Contactus/Contactus";
import Home from "./Home/Home";
import MainNavigation from "./MainNavigation/MainNavigation";
import Services from "./Services/Services";
import Aboutus from "./Aboutus/Aboutus";
import { Container } from "react-bootstrap";

const MainPage = () => {
  return (
    <>
      <MainNavigation />
      <section id="home" className="p-0 m-0">
        <Home />
      </section>
      <section id="aboutus" className="p-0 m-0">
        <Aboutus />
      </section>
      <section id="services" className="p-0 m-0">
        <Services />
      </section>
      <section id="contactus" className="p-0 m-0">
        <Contactus />
      </section>
    </>
  );
};

export default MainPage;
