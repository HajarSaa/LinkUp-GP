// /* eslint-disable no-unused-vars */
// import "@fontsource/lato";
// // import "@fontsource/lato/500"; // Medium
// // import "@fontsource/lato/600"; // Semi-bold
// import "./styles/variables.css";
// import "./styles/classes.css";
// import "./styles/global.css";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Channel from "./pages/content/Channel/Channel";
// import MainLayout from "./layouts/MainLayout/MainLayout";
// import { Routes, Route } from "react-router-dom";
// import { useSelector } from "react-redux";
// import BrowseChannels from "./pages/content/browseChannels/BrowseChannels";
// import GlobalModals from "./components/UI/Modal/GlobalModals";
// import ChannelDetailsModal from "./components/UI/Modal/channel/ChannelDetailsModal/ChannelDetailsModal";


// function App() {
//   return (
//     <div className="app__body">
//       <Routes>
//         <Route path="/" element={<MainLayout />}>
//           <Route path="channels/:id" element={<Channel />} />
//           <Route path="channels" element={<BrowseChannels />} />
//           {/* ✅ [جديد] راوت ديناميكي للـ Channel */}
//         </Route>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//       {/* models */}
//       <GlobalModals />
//     </div>
//   );
// }

// export default App;


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