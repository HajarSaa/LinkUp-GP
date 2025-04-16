import { Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import authRoutes from "./authRoutes";

const AppRoutes = () => [
  <Route key="/" path="/" element={<Navigate to="/login" />} />,
  // eslint-disable-next-line react/jsx-key
  <Route element={<AuthLayout />}>
    {authRoutes}
  </Route>
  ];

export default AppRoutes;
