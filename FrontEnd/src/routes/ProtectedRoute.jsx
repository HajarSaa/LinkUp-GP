import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import useGetMe from "../API/hooks/useGetMe";
import ProtectedLoading from "./ProtectedLoading/ProtectedLoading";
import { setUser } from "../API/redux_toolkit/api_data/userSlice";

function ProtectedRoute() {
  const dispatch = useDispatch();

  const { data, isLoading, error, isError } = useGetMe();


  useEffect(() => {
    if (data?.user) {
      dispatch(setUser(data.user));
      localStorage.setItem("currentUser", JSON.stringify(data.user));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (isError) {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        dispatch(setUser(JSON.parse(storedUser)));
      }
    }
  }, [isError, dispatch]);

  if (isLoading) return <ProtectedLoading />;

  if (error) console.log(error);

  if (!data?.user) {
    console.log("User not authenticated, redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
