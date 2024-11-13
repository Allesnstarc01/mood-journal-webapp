import React from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";

const PrivateContent = () => {
  const auth = localStorage.getItem("users");
  return auth ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateContent;
