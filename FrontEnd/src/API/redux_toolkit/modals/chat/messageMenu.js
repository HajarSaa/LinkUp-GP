// messageMenuSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  position: null,
  activeMessageId: null,
  isSender: false,
  isInThread: false,
  createdAt: null,
};


const messageMenuSlice = createSlice({
  name: "messageMenu",
  initialState,
  reducers: {
    openMessageMenuModal: (state, action) => {
      state.isOpen = true;
      if (action.payload) {
        state.position = action.payload.position;
        state.activeMessageId = action.payload.activeMessageId;
        state.isSender = action.payload.isSender;
        state.isInThread = action.payload.isInThread || false;
        state.createdAt = action.payload.createdAt || null;
      }
    },

    closeMessageMenuModal: (state) => {
      state.isOpen = false;
      state.position = null;
      state.activeMessageId = null;
      state.isSender = false;
      state.isInThread = false;
      state.createdAt = null;
    },
  },
});

export const { openMessageMenuModal, closeMessageMenuModal } =
  messageMenuSlice.actions;
export default messageMenuSlice.reducer;
