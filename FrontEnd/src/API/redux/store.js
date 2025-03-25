import { configureStore } from "@reduxjs/toolkit";
import threadReducer from "./chat/channel/threadSlice";
import channelDetailsReducer from "./chat/channel/channelDetailsSlice";
import profilePanelReducer from './chat/channel/profilePanelSlice'
import modalReducer from "./chat/channel/modalSlice";
import addChannelMenuReducer from "./chat/channel/addChannelMenuSlice";
import channelMenuReducer from './chat/channel/channelMenuSlice'
import notificationsModalReducer from './chat/channel/notificationsModelSlice'

const store = configureStore({
    reducer: {
        threads: threadReducer,
        channelDetails: channelDetailsReducer,
        profilePanel: profilePanelReducer,
        modal: modalReducer,
        addChannelMenu: addChannelMenuReducer,
        channelMenu: channelMenuReducer,
        notificationsModal: notificationsModalReducer,
    },
});

export default store;
