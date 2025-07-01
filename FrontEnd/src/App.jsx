import "@fontsource/lato";
import "./styles/variables.css";
import "./styles/classes.css";
import "./styles/global.css";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import MainLayout from "./layouts/MainLayout/MainLayout";
import EmptyLayout from "./layouts/MainLayout/EmptyLayout";
import BrowseChannels from "./pages/dashboard/BrowseChannels";
import DmPage from "./pages/dashboard/DmPage";
import { Routes, Route } from "react-router-dom";
import ChannelPage from "./pages/dashboard/ChannelPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import Landing from "./pages/Landing/Landing";

import Step1 from "./pages/dashboard/CreateWorkspace/Step1";
import Step2 from "./pages/dashboard/CreateWorkspace/Step2";
import Step3 from "./pages/dashboard/CreateWorkspace/Step3";
import ProtectedLoading from "./components/UI/ProtectedLoading/ProtectedLoading";
import LaterPage from "./pages/dashboard/LaterPage";
import NotificationPage from "./pages/dashboard/NotificationPage";
import SearchPage from "./pages/dashboard/SearchPage";
import AcceptInvitaions from "./pages/dashboard/AcceptInvitaions/AcceptInvitaions";

function App() {
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
            <Route path="search" element={<SearchPage />} />
            {/* التفرعات الخاصة بـ later */}
            <Route path="later" element={<LaterPage />}>
              <Route path="conversations/:id" element={<DmPage />} />
              <Route path="channels/:id" element={<ChannelPage />} />
            </Route>
            <Route path="notifications" element={<NotificationPage />}>
              <Route path="conversations/:id" element={<DmPage />} />
              <Route path="channels/:id" element={<ChannelPage />} />
            </Route>

            {/* <Route path="testing" element={<Testing />} /> */}
          </Route>

          {/* Create Workspace Flow */}
          <Route path="/new-workspace" element={<EmptyLayout />}>
            <Route path="step-1" element={<Step1 />} />
            <Route path="step-2" element={<Step2 />} />
            <Route path="step-3" element={<Step3 />} />
          </Route>
            <Route path="accept-invitaion" element={<AcceptInvitaions />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
