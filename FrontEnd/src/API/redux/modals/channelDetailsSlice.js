import { createSlice } from "@reduxjs/toolkit";

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
      state.activeTab = action.payload.tab || "about"; // ✅ التاب يجي من الـ payload أو يكون "about" كافتراضي
    },
    closeChannelDetails: (state) => {
      state.isOpen = false;
      state.channelData = null;
      state.activeTab = "about"; // ✅ عند الإغلاق، يرجع للتاب الافتراضي
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload; // ✅ تحديث التاب المختار
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
