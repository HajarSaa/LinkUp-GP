import { configureStore } from "@reduxjs/toolkit";

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
import workspaceReducer from './api_data/workspaceSlice'
import channelReducer from "./api_data/channelSlice";
import conversReducer from "./api_data/conversSlice";
import resizingReducer from './ui/resizeSlice'
import modalsReducer from './modals/modalsSlice';

const store = configureStore({
  reducer: {
    resizing: resizingReducer,
    chatPanel: chatPanelReducer,
    workspace: workspaceReducer,
    channel: channelReducer,
    convers: conversReducer,

    addChannelMenu: addChannelMenuReducer,
    channelMenu: channelMenuReducer,
    // Modals
    modals: modalsReducer,
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
