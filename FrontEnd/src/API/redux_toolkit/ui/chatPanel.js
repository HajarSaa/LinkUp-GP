import { createSlice } from "@reduxjs/toolkit";

const chatPanel = createSlice({
  name: "chatPanel",
  initialState: {
    userPanel: { isOpen: false ,userData:null},
    threadPanel: false,
  },
  reducers: {
    openUserPanel: (state,action) => {
      state.threadPanel = false;
      state.userPanel.isOpen = true;
      state.userPanel.userData = action.payload;
    },
    openThreadPanel: (state) => {
      state.userPanel.isOpen = false;
      state.threadPanel = true;
    },
    closeChatPanel: (state) => {
      state.userPanel.isOpen = false;
      state.userPanel.userData = null;
      state.threadPanel = false;
    },
  },
});

export default chatPanel.reducer;
export const { openUserPanel, openThreadPanel, closeChatPanel } =
  chatPanel.actions;
