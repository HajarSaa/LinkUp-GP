import "@fontsource/lato";
import "./styles/variables.css";
import "./styles/classes.css";
import "./styles/global.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MainLayout from "./layouts/MainLayout/MainLayout";
import BrowseChannels from './pages/content/BrowseChannels/BrowseChannels';
import Channel from "./pages/content/Channel/Channel";
import DmPage from "./pages/dashboard/DmPage";
import GlobalModals from "./components/UI/Modal/GlobalModals";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="app__body">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="dm/:id" element={<DmPage />} />
          <Route path="channels/:id" element={<Channel />} />
          <Route path="browse-channels" element={<BrowseChannels />} />
        </Route>
      </Routes>
      {/* models */}
      <GlobalModals />
    </div>
  );
}

export default App;