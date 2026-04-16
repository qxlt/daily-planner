import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../lib/auth.js";

const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
