import "@fontsource/lato";
import "./styles/variables.css";
import "./styles/classes.css";
import "./styles/global.css";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import MainLayout from "./layouts/MainLayout/MainLayout";
import BrowseChannels from "./pages/dashboard/BrowseChannels/BrowseChannels";
import DmPage from "./pages/dashboard/DmPage";
import { Routes, Route } from "react-router-dom";
import ChannelPage from "./pages/dashboard/ChannelPage";

import ProtectedRoute from "./components/Auth/ProtectedRoute";
import CreateWorkspace from "./pages/dashboard/CreateWorkspace/CreateWorkspace";
import Landing from "./pages/dashboard/Landing/Landing";
function App() {
  return (
    <div className="app__body">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/create-workspace"
          element={
            <ProtectedRoute>
              <CreateWorkspace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/landing"
          element={
            <ProtectedRoute>
              <Landing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dm/:id" element={<DmPage />} />
          <Route path="channels/:id" element={<ChannelPage />} />
          <Route path="browse-channels" element={<BrowseChannels />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
