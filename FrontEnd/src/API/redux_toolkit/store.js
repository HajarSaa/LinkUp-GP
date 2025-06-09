import { configureStore } from "@reduxjs/toolkit";

import chatPanelReducer from "./ui/chatPanelSlice";
import addChannelMenuReducer from "./chat/channel/addChannelMenuSlice";
import channelMenuReducer from "./chat/channel/channelMenuSlice";
// Modals
import notificationsModalReducer from "./modals/notificationsModalSlice";
import channelDetailsModalReducer from "./modals/channelDetailsSlice";
import createChannelModalReducer from "./modals/createChannelmodalSlice";
import emojiPickerReducer from "./modals/emojiPickerSlice";
import workspaceReducer from "./api_data/workspaceSlice";
import channelReducer from "./api_data/channelSlice";
import conversReducer from "./api_data/conversSlice";
import resizingReducer from "./ui/resizeSlice";
import modalsReducer from "./modals/modalsSlice";
import userReducer from "./api_data/userSlice";
import channel_messages_reducer from "./api_data/messages/channelMessagesSlice";
import userProfileSlice from "./api_data/userProfileSlice";
//======
// ==============================(User Profile)
import editUserProfileReducer from "./modals/userProfile/editUserProfie";
import editContactReducer from "./modals/userProfile/editContactModal";
import editStartDateReducer from "./modals/userProfile/editStartDateSlice";
import uploadUserImageReducer from "./modals/userProfile/uploadUserImage";
import setStatusReducer from "./modals/userProfile/setStatusSlice";
import userMenuReducer from "./modals/userProfile/userMenuSlice";
//======
// ==============================(Conversation)
import userDetailsReducer from "./modals/convers/userDetailsModal";
//======

const store = configureStore({
  reducer: {
    currentUser: userReducer,
    resizing: resizingReducer,
    chatPanel: chatPanelReducer,
    workspace: workspaceReducer,
    // ==============================(channel)
    // ====
    channel: channelReducer,
    channel_messages: channel_messages_reducer,
    addChannelMenu: addChannelMenuReducer,
    channelMenu: channelMenuReducer,
    channelDetailsModal: channelDetailsModalReducer,
    createChannelModal: createChannelModalReducer,
    // ==============================(conversation)
    // ====
    convers: conversReducer,
    userDetailsModal: userDetailsReducer,
    // ==============================(User Profile)
    // ====
    editUserProfile: editUserProfileReducer,
    editContact: editContactReducer,
    editStartDate: editStartDateReducer,
    uploadUserImage: uploadUserImageReducer,
    setStatus: setStatusReducer,
    userMenu: userMenuReducer,
    // ==============================(Modals)
    // ====
    modals: modalsReducer,
    // ==============================(Global)
    // ====
    notificationsModal: notificationsModalReducer,
    emojiPicker: emojiPickerReducer,
    userProfile: userProfileSlice,
  },
});

export default store;
