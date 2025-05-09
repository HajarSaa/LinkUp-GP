import { configureStore } from "@reduxjs/toolkit";

import authReducer from './auth/authSlice'

import chatPanelReducer from "./ui/chatPanel";
import addChannelMenuReducer from "./chat/channel/addChannelMenuSlice";
import channelMenuReducer from "./chat/channel/channelMenuSlice";
import channelsReducer from './chat/channel/channelsSlice'
// Modals
import notificationsModalReducer from "./modals/notificationsModalSlice";
import channelDetailsModalReducer from "./modals/channelDetailsSlice";
import createChannelModalReducer from "./modals/createChannelmodalSlice";
import convActionModalReducer from "./modals/convActionModal";
import huddleModalReducer from './modals/huddleSlice';
import addButtonModalReducer from "./modals/addButtonModal";
import emojiPickerReducer from './modals/emojiPickerSlice'


const store = configureStore({
  reducer: {

    auth: authReducer,
    
    chatPanel: chatPanelReducer,
    addChannelMenu: addChannelMenuReducer,
    channelMenu: channelMenuReducer,
    // Modals
    convActionModal: convActionModalReducer,
    huddleModal: huddleModalReducer,
    channelDetailsModal: channelDetailsModalReducer,
    createChannelModal: createChannelModalReducer,
    notificationsModal: notificationsModalReducer,
    addButtonModal: addButtonModalReducer,
    emojiPicker: emojiPickerReducer,
    // Channels List
    channels: channelsReducer,
  },
});

export default store;
