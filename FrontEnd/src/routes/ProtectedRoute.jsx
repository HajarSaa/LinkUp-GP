import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import useGetMe from "../API/hooks/useGetMe";
import ProtectedLoading from "./ProtectedLoading/ProtectedLoading";

function ProtectedRoute() {
  const { isAuthenticated, loading, error } =
    useGetMe();


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