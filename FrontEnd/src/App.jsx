import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import "@fontsource/lato";
import "./styles/variables.css";
import "./styles/global.css";
import { Navigate, Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <>
        <Routes>
          {/* تحويل الصفحة الرئيسية لصفحة الـ Login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* صفحات الـ Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </>
  );
}

export default App;
