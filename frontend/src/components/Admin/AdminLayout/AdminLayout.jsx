import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { ContextProvider } from "../../../store/ContextApi";

const AdminLayout = () => {
  const { adminToken, addAdminToken } = useContext(ContextProvider);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Here you can clear any authentication data or tokens
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminId");
    addAdminToken("");
    console.log("Logging out...");
    navigate("/admin"); // Redirecting to login after logout
  };

  return (
    <>
      <Container
        fluid
        className="bg-black text-white d-flex justify-content-between align-items-center w-100 p-0"
      >
        <h4 className="m-3">Admin Layout</h4>
        {adminToken && (
          <button className="btn btn-warning m-3" onClick={handleLogout}>
            Logout
          </button>
        )}
      </Container>

      <Container fluid className="m-0 p-0">
        <Outlet />
      </Container>
    </>
  );
};

export default AdminLayout;
