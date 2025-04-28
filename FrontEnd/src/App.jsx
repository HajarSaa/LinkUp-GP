import "@fontsource/lato";
import "./styles/variables.css";
import "./styles/classes.css";
import "./styles/global.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// import MainLayout from "./layouts/MainLayout/MainLayout";
// import BrowseChannels from "./pages/dashboard/BrowseChannels/BrowseChannels";
// import DmPage from "./pages/dashboard/DmPage";
// import ChannelPage from "./pages/dashboard/ChannelPage";
import { Routes, Route } from "react-router-dom";
import WorkspaceLanding from "./pages/WorkspaceCreation/WorkspaceLanding/WorkspaceLanding";
import CreateWorkspace from "./pages/WorkspaceCreation/CreateWorkspace";
function App() {
  return (
    <div className="app__body">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/" element={<MainLayout />}>
          <Route path="dm/:id" element={<DmPage />} />
          <Route path="channels/:id" element={<ChannelPage />} />
          <Route path="browse-channels" element={<BrowseChannels />} />
        </Route> */}
        <Route path="/" element={<WorkspaceLanding />} />
        <Route path="/create-workspace" element={<CreateWorkspace />} />
      </Routes>
    </div>
  );
}

export default App;
