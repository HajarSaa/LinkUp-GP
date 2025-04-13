import { configureStore } from "@reduxjs/toolkit";
import threadReducer from "./chat/channel/threadSlice";
import profilePanelReducer from "./chat/channel/profilePanelSlice";
import addChannelMenuReducer from "./chat/channel/addChannelMenuSlice";
import channelMenuReducer from "./chat/channel/channelMenuSlice";
import notificationsModalReducer from "./chat/channel/notificationsModelSlice";
import channelsReducer from './chat/channel/channelsSlice'
// Modals
import channelDetailsModal from "./modals/channelDetailsSlice";
import createChannelModal from './modals/createChannelmodalSlice'
import convActionModalReducer from "./modals/convActionModal";
import huddleModalReducer from './modals/huddleSlice'

const store = configureStore({
  reducer: {
    threads: threadReducer,
    profilePanel: profilePanelReducer,
    addChannelMenu: addChannelMenuReducer,
    channelMenu: channelMenuReducer,
    notificationsModal: notificationsModalReducer,
    // Modals
    convActionModal: convActionModalReducer,
    huddleModal: huddleModalReducer,
    channelDetailsModal,
    createChannelModal,
    // Channels List
    channels: channelsReducer,
  },
});

export default store;
