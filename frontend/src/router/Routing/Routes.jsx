import React, { useContext, useEffect } from "react";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import RootLayout from "../RootLayout/RootLayout";
import AdminLayout from "../../components/Admin/AdminLayout/AdminLayout";
import AdminSignup from "../../components/Admin/AdminSignup/AdminSignup";
import AdminLogin from "../../components/Admin/AdminLogin/AdminLogin";
import UserList from "../../components/Admin/UserList/UserList";

import MainPage from "../../components/MainPage/MainPage";
import InterestRate from "../../components/InterestRate/InterestRate";
import { ContextProvider } from "../../store/ContextApi";

// AdminToken Component
function AdminToken() {
  const { adminToken, addAdminToken } = useContext(ContextProvider); // use ContextApi

  useEffect(() => {
    const storedAdminToken = localStorage.getItem("adminToken");
    if (!adminToken && storedAdminToken) {
      addAdminToken(storedAdminToken);
    }
  }, [adminToken, addAdminToken]);

  // If admin is authenticated, show user list or other admin components
  return adminToken ? <UserList /> : <AdminLogin />;
}

const AdminErrorPage = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Oops! Something went wrong.</h1>
      <p>We couldn't find what you were looking for.</p>
      <Link
        className="bg-warning p-2 text-white rounded-2 text-decoration-none"
        to="/admin"
      >
        Go back to Home
      </Link>
    </div>
  );
};

// ErrorPage Component
const ErrorPage = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Oops! Something went wrong.</h1>
      <p>We couldn't find what you were looking for.</p>
      <Link
        className="bg-warning p-2 text-white rounded-2 text-decoration-none"
        to="/"
      >
        Go back to Home
      </Link>
    </div>
  );
};

// UserToken Component
function UserToken() {
  const { token, addToken } = useContext(ContextProvider); // use ContextApi

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!token && storedToken) {
      addToken(storedToken);
    }
    if (!token && !storedToken) {
      navigate("/"); // Programmatic navigation to "/"
    }
  }, [token, addToken]);

  return token ? <InterestRate /> : <MainPage />;
}

// Routes Configuration
const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <MainPage /> },
        { path: "interestrate", element: <UserToken /> },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      errorElement: <AdminErrorPage />,
      children: [
        { index: true, element: <AdminToken /> }, // Admin-protected route
        // { path: "signupadmin", element: <AdminSignup /> },
        { path: "loginadmin", element: <AdminLogin /> },
        { path: "userlist", element: <AdminToken /> }, // Admin-protected content
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
