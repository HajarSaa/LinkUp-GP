import { createSlice } from "@reduxjs/toolkit";
import {
  addToOpenedUserPanelItems,
  RemoveFromOpenedUserPanelItems,
} from "../../../utils/panelUtils";

const chatPanel = createSlice({
  name: "chatPanel",
  initialState: {
    userPanel: { isOpen: false, userData: null },
    threadPanel: false,
  },
  reducers: {
    openUserPanel: (state, action) => {
      state.threadPanel = false;
      state.userPanel.isOpen = true;
      state.userPanel.userData = action.payload.panel_id;
      addToOpenedUserPanelItems(
        action.payload?.page_id,
        action.payload?.panel_id
      );
    },
    openThreadPanel: (state) => {
      state.userPanel.isOpen = false;
      state.threadPanel = true;
    },
    closeChatPanel: (state, action) => {
      state.userPanel.isOpen = false;
      state.userPanel.userData = null;
      state.threadPanel = false;
      if (action?.payload?.type === "userPanel") {
        RemoveFromOpenedUserPanelItems(action?.payload?.page_id);
      }
    },
  },
});

export default chatPanel.reducer;
export const { openUserPanel, openThreadPanel, closeChatPanel } =
  chatPanel.actions;
