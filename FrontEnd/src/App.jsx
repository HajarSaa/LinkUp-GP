// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import "@fontsource/lato";
// import "./styles/variables.css";
// import "./styles/global.css";
// import { Navigate, Route, Routes } from "react-router-dom";

// function App() {
//   return (
//     <>
//         <Routes>
//           {/* تحويل الصفحة الرئيسية لصفحة الـ Login */}
//           <Route path="/" element={<Navigate to="/login" replace />} />

//           {/* صفحات الـ Authentication */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//     </>
//   );
// }

// export default App;

import "@fontsource/lato";
import "./styles/variables.css";
import "./styles/global.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MainLayout from "./layouts/MainLayout/MainLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app__body">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Routes>
                  <Route path="/" element={<h1>Welcome</h1>} />
                </Routes>
              </MainLayout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
