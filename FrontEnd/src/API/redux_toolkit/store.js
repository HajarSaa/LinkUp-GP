import { configureStore } from "@reduxjs/toolkit";

import chatPanelReducer from "./ui/chatPanelSlice";
// import addChannelMenuReducer from "./chat/channel/addChannelMenuSlice";
import channelMenuReducer from "./modals/channel/channelMenuSlice";
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
import userProfileSlice from "./api_data/userProfileSlice";
import typingReducer from "./api_data/typingSlice";
//======
// ==============================(Search)
import searchDataReducer from "./api_data/search/searchSlice";
//======
// ==============================(Global)
import recordingReducer from "./ui/recording";
//======
// ==============================(channels)
import channelMediaReducer from "./api_data/media/channelMediaSlice";
import browseChannelsReducer from "./api_data/channels/browseChannels";
//======
// ==============================(Worskpace)
import createWorkspaceReducer from "./ui/creationsStep";
import workspaceMenuReducer from "./modals/workspace/workspaceMenu";
import searchReducer from "./ui/searchSlice";
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
import conversMediaReducer from "./api_data/media/conversMediaSlice";
//======
//======
// ==============================(<Media>)
import fileUploadReducer from "./api_data/media/fileUploadSlice";
//======
// ==============================(Messages)
import channel_messages_reducer from "./api_data/messages/channelMessagesSlice";
import convers_messages_reducer from "./api_data/messages/conversMessagesSlice";
import messageMenuReducer from "./modals/chat/messageMenu";
import inputMenuReducer from "./modals/chat/inputMenu";
import threadsReducer from "./api_data/messages/threadsSlice";
import editMessageReducer from "./api_data/messages/editMessageSlice";
import messageDraftReducer from "./api_data/messages/messageDraftSlice";
import messageReactionsReducer from "./api_data/messages/messageReactionsSlice";
import pinnedChannelMessageReducer from "./api_data/messages/pinnedChannelMessagesSlice";
import pinnedConversMessageReducer from "./api_data/messages/pinnedConversationMessagesSlice";

//======

const store = configureStore({
  reducer: {
    currentUser: userReducer,
    resizing: resizingReducer,
    chatPanel: chatPanelReducer,
    workspace: workspaceReducer,
    // ==============================(channel)
    browseChannels: browseChannelsReducer,
    channel: channelReducer,
    channel_messages: channel_messages_reducer,
    channelMenu: channelMenuReducer,
    channelDetailsModal: channelDetailsModalReducer,
    createChannelModal: createChannelModalReducer,
    channelMedia: channelMediaReducer,
    // ==============================(workspace)
    // ====
    createWorkspace: createWorkspaceReducer,
    workspaceMenu: workspaceMenuReducer,
    search: searchReducer,
    // ==============================(conversation)
    // ====
    convers: conversReducer,
    userDetailsModal: userDetailsReducer,
    convers_messages: convers_messages_reducer,
    conversMedia: conversMediaReducer,
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
    // ==============================(Media)
    // ====
    fileUpload: fileUploadReducer,
    // ==============================(Messages)
    // ====
    messageMenu: messageMenuReducer,
    inputMenu: inputMenuReducer,
    threads: threadsReducer,
    editMessage: editMessageReducer,
    messageDraft: messageDraftReducer,
    messageReactions: messageReactionsReducer,
    pinnedChannelMessages: pinnedChannelMessageReducer,
    pinnedConverMessages: pinnedConversMessageReducer,
    typing: typingReducer,
    // ==============================(Search)
    // ====
    searchData: searchDataReducer,
    // ==============================(Global)
    // ====
    notificationsModal: notificationsModalReducer,
    emojiPicker: emojiPickerReducer,
    userProfile: userProfileSlice,
    recording: recordingReducer,
  },
});

export default store;
