/* eslint-disable no-unused-vars */
import "@fontsource/lato";
// import "@fontsource/lato/500"; // Medium
// import "@fontsource/lato/600"; // Semi-bold
import "./styles/variables.css";
import "./styles/classes.css";
import "./styles/global.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Channel from "./pages/content/Channel/Channel";
import MainLayout from "./layouts/MainLayout/MainLayout";
import { Routes, Route } from "react-router-dom";
import ChannelDetails from "./components/Chat/channel/channelDetails/ChannelDetails";
import { useSelector } from "react-redux";
import CreateChannelModal from "./components/Chat/channel/createChannelModel/CreateChannelModal";
import AddPeopleModal from "./components/Chat/channel/addPeopleModal/AddPeopleModal";
import BrowseChannels from "./pages/content/browseChannels/BrowseChannels";
import NotificationsModal from "./components/Chat/channel/header/channelMenu/notifiactionModel/NotificationsModel";
import Models from "./Models";

function App() {
    return (
        <div className="app__body">
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="channels/:id" element={<Channel />} />
                    <Route path="channels" element={<BrowseChannels />} />
                    {/* ✅ [جديد] راوت ديناميكي للـ Channel */}
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            {/* models */}
            <Models/>
        </div>
    );
}

export default App;
