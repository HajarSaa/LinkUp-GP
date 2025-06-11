import { createSlice } from "@reduxjs/toolkit";
import {
  addToOpenedUserPanelItems,
  RemoveFromOpenedUserPanelItems,
} from "../../../utils/panelUtils";

const chatPanel = createSlice({
  name: "chatPanel",
  initialState: {
    userPanel: { isOpen: false, userData: null },
    threadPanel: { isOpen: false, parentMessage: null, threadID: null },
  },
  reducers: {
    openUserPanel: (state, action) => {
      state.threadPanel.isOpen = false;
      state.userPanel.isOpen = true;
      state.userPanel.userData = action.payload.panel_id;
      addToOpenedUserPanelItems(
        action.payload?.page_id,
        action.payload?.panel_id
      );
    },
    openThreadPanel: (state, action) => {
      state.userPanel.isOpen = false;
      state.threadPanel.isOpen = true;
      state.threadPanel.threadID = action.payload.threadID;
      state.threadPanel.parentMessage = action.payload.parentMessage;
    },
    closeChatPanel: (state, action) => {
      // profile
      state.userPanel.isOpen = false;
      state.userPanel.userData = null;
      if (action?.payload?.type === "userPanel") {
        RemoveFromOpenedUserPanelItems(action?.payload?.page_id);
      }
      // Threads
      state.threadPanel.isOpen = false;
      state.threadPanel.threadID = null;
      state.threadPanel.parentMessage = null;
    },
  },
});

export default chatPanel.reducer;
export const { openUserPanel, openThreadPanel, closeChatPanel } =
  chatPanel.actions;
