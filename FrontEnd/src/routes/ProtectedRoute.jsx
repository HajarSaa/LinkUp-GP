import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import useCurrentUser from "../API/hooks/useCurrentUser";

function ProtectedRoute() {
  const { isAuthenticated, loading, error } = useCurrentUser()


  if (error) console.log(error)
  if (loading) return <p>Loading...</p>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet/>
}

ProtectedRoute.propTypes = {
  children: PropTypes.any,
};

export default ProtectedRoute;
