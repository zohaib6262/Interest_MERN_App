import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ContextProvider } from "../../store/ContextApi";
import { useContext } from "react";

const Logout = () => {
  const navigate = useNavigate();
  const { token, addToken } = useContext(ContextProvider);

  return (
    <Container className="d-flex justify-content-end">
      {token && (
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            addToken("");
            navigate("/");
          }}
          className="text-white text-decoration-none bg-warning "
        >
          Logout
        </Button>
      )}
    </Container>
  );
};

export default Logout;
