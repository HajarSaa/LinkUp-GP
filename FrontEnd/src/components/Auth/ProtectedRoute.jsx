
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getMeService } from "../../API/services/authService";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = لسه بيشيك
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getMeService();
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error)
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.any,
};

export default ProtectedRoute;
