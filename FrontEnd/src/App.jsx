import "@fontsource/lato";
import "./styles/variables.css";
import "./styles/classes.css";
import "./styles/global.css";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import MainLayout from "./layouts/MainLayout/MainLayout";
import EmptyLayout from "./layouts/MainLayout/EmptyLayout";
import BrowseChannels from "./pages/dashboard/BrowseChannels/BrowseChannels";
import DmPage from "./pages/dashboard/DmPage/DmPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import {useState } from "react";
import ChannelPage from "./pages/dashboard/ChannelPage/ChannelPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import Landing from "./pages/Landing/Landing";

import Step1 from "./pages/dashboard/CreateWorkspace/Step1";
import Step2 from "./pages/dashboard/CreateWorkspace/Step2";
import Step3 from "./pages/dashboard/CreateWorkspace/Step3";
import ProtectedLoading from "./components/UI/ProtectedLoading/ProtectedLoading";
import Testing from "../Testing/Code/Testing";



function App() {
  const [workspace, setWorkspace] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();


  // Step 1: Save workspace
  const handleStep1Next = (createdWorkspace) => {
    setWorkspace(createdWorkspace);
    navigate("/create-workspace/step-2");
  };

  // Step 2: Save user name
  const handleStep2Next = (name) => {
    setUserName(name);
    navigate("/create-workspace/step-3");
  };

  // Step 3: Final step (e.g., emails entered)
  const handleStep3Next = (enteredEmails) => {
    console.log("Final Submission ✅", {
      teamName: workspace?.name,
      userName,
      emails: enteredEmails,
    });
    navigate("/");
  };
  return (
    <div className="app__body">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/loading" element={<ProtectedLoading />} />

        <Route element={<ProtectedRoute />}>

          <Route path="/workspaces-landing" element={<Landing />} />

          <Route path="/" element={<MainLayout />}>
            <Route path="conversations/:id" element={<DmPage />} />
            <Route path="channels/:id" element={<ChannelPage />} />
            <Route path="browse-channels" element={<BrowseChannels />} />
            <Route path="testing" element={<Testing />} />
          </Route>

          {/* Create Workspace Flow */}
          <Route path="/create-workspace" element={<EmptyLayout />}>
            <Route path="step-1" element={<Step1 onNext={handleStep1Next} />} />
            <Route
              path="step-2"
              element={<Step2 onNext={handleStep2Next} workspace={workspace} />}
            />
            <Route
              path="step-3"
              element={
                <Step3
                  workspace={workspace}
                  userName={userName}
                  onNext={handleStep3Next}
                />
              }
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
