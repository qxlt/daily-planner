import { Navigate, Outlet, useParams } from "react-router-dom";
import { buildProtectedPath, getAuthUsername, isAuthenticated } from "../lib/auth.js";

const ProtectedRoute = () => {
  const { username } = useParams();

  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }

  const sessionUsername = getAuthUsername();

  if (!username || username !== sessionUsername) {
    return <Navigate to={buildProtectedPath("/addtask", sessionUsername)} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
