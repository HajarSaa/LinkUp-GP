import { createSlice } from "@reduxjs/toolkit";
import {
  addToOpenedthreadPanelItems,
  addToOpenedUserPanelItems,
  RemoveFromOpenedThreadPanelItems,
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
      // handle opened logic
      // 1- remove thread panel first
      RemoveFromOpenedThreadPanelItems(action.payload?.page_id);
      // 2- then add user panel
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
      // handle opened logic
      // 1- remove user panel first
      RemoveFromOpenedUserPanelItems(action?.payload?.page_id);
      // 2- then add thread panel
      addToOpenedthreadPanelItems(
        action.payload?.page_id,
        action.payload?.threadID,
        action.payload?.parentMessage
      );
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
      if (action?.payload?.type === "threadPanel") {
        RemoveFromOpenedThreadPanelItems(action?.payload?.page_id);
      }
    },
    
    updateThreadParentContent: (state, action) => {
      const { messageId, newContent, editedAt, updatedAt } = action.payload;
      if (state.threadPanel.parentMessage?._id === messageId) {
        state.threadPanel.parentMessage = {
          ...state.threadPanel.parentMessage,
          content: newContent,
          edited: true,
          editedAt,
          updatedAt,
        };
      }
    },
  },
});

export default chatPanel.reducer;
export const {
  openUserPanel,
  openThreadPanel,
  closeChatPanel,
  updateThreadParentContent,
} = chatPanel.actions;
