import { createSlice } from "@reduxjs/toolkit";

// import mockChannels from '../../services/mockChannels';
// const firstChannel = mockChannels[0];

const initialState = {
  isOpen: false,
  channelData: null,
  activeTab: "about",
  editModal: {
    renameChannel: false,
    editTopic: false,
    description: false,
  },
};

const channelDetailsSlice = createSlice({
  name: "channelDetails",
  initialState,
  reducers: {
    openChannelDetails: (state, action) => {
      state.isOpen = true;
      state.channelData = action.payload.channel;
      state.activeTab = action.payload.tab || "about";
    },
    closeChannelDetails: (state) => {
      state.isOpen = false;
      state.channelData = null;
      state.activeTab = "about";
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    // Edit Modals
    openRenameModal: (state) => {
      state.editModal.renameChannel = true;
      state.editModal.editTopic = false;
      state.editModal.description = false;
    },
    openEditTopicModal: (state) => {
      state.editModal.renameChannel = false;
      state.editModal.editTopic = true;
      state.editModal.description = false;
    },
    openDescribtionModal: (state) => {
      state.editModal.description = true;
      state.editModal.editTopic = false;
      state.editModal.renameChannel = false;
    },
    closeEditModal: (state) => {
      state.editModal.description = false;
      state.editModal.editTopic = false;
      state.editModal.renameChannel = false;
    },
  },
});

export const {
  openChannelDetails,
  closeChannelDetails,
  setActiveTab,
  openRenameModal,
  openEditTopicModal,
  openDescribtionModal,
  closeEditModal,
} = channelDetailsSlice.actions;
export default channelDetailsSlice.reducer;
