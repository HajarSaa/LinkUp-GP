import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
import chatPanelReducer from "./ui/chatPanel";
import threadReducer from "./chat/channel/threadSlice";
import profilePanelReducer from "./chat/channel/profilePanelSlice";
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
=======
import chatPanelReducer from './ui/chatPanel';
>>>>>>> main

const store = configureStore({
  reducer: {
    chatPanel: chatPanelReducer,
<<<<<<< HEAD
    threads: threadReducer,
    profilePanel: profilePanelReducer,
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
=======
>>>>>>> main
  },
});

export default store;
