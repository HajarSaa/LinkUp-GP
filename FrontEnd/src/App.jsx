import "@fontsource/lato";
import "./styles/variables.css";
import "./styles/classes.css";
import "./styles/global.css";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import MainLayout from "./layouts/MainLayout/MainLayout";
import BrowseChannels from './pages/dashboard/BrowseChannels/BrowseChannels';
import DmPage from "./pages/dashboard/DmPage";
import { Routes, Route } from "react-router-dom";
import ChannelPage from "./pages/dashboard/ChannelPage";
function App() {
  return (
    <div className="app__body">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="dm/:id" element={<DmPage />} />
          <Route path="channels/:id" element={<ChannelPage />} />
          <Route path="browse-channels" element={<BrowseChannels />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;