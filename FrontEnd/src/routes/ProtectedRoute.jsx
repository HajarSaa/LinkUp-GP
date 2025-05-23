import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import useCurrentUser from "../API/hooks/useCurrentUser";
import ProtectedLoading from "./ProtectedLoading/ProtectedLoading";

function ProtectedRoute() {
  const { isAuthenticated, loading, error } =
    useCurrentUser();


  if (error) console.log(error);

  if (loading) return <ProtectedLoading/>

  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.any,
};

export default ProtectedRoute;