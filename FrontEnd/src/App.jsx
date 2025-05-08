import "@fontsource/lato";
import "./styles/variables.css";
import "./styles/classes.css";
import "./styles/global.css";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import MainLayout from "./layouts/MainLayout/MainLayout";
import EmptyLayout from "./layouts/MainLayout/EmptyLayout";
import BrowseChannels from "./pages/dashboard/BrowseChannels/BrowseChannels";
import DmPage from "./pages/dashboard/DmPage";
import { Routes, Route } from "react-router-dom";
import ChannelPage from "./pages/dashboard/ChannelPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import Landing from "./pages/dashboard/Landing/Landing";

import Step1 from "./pages/dashboard/CreateWorkspace/Step1";
import Step2 from "./pages/dashboard/CreateWorkspace/Step2";
import Step3 from "./pages/dashboard/CreateWorkspace/Step3";


function App() {
  return (
    <div className="app__body">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/workspaces-landing" element={<Landing />} />

          <Route path="/" element={<MainLayout />}>
            <Route path="dm/:id" element={<DmPage />} />
            <Route path="channels/:id" element={<ChannelPage />} />
            <Route path="browse-channels" element={<BrowseChannels />} />
          </Route>

          <Route path="/create-workspace" element={<EmptyLayout />}>
            <Route path="step-1" element={<Step1 />} />
            <Route path="step-2" element={<Step2 />} />
            <Route path="step-3" element={<Step3 />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
