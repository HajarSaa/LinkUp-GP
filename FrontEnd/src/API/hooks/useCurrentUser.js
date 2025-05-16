import { useState, useEffect } from "react";
import {getMeService} from '../services/authService'

const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [workspaces, setWorkspaces] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getMeService();
        setUser(response.user);
        setWorkspaces(response.workspaces);
        setIsAuthenticated(true);
      } catch (err) {
        console.log(err);
        setError(err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { user,workspaces, isAuthenticated, loading, error };
};

export default useCurrentUser;
