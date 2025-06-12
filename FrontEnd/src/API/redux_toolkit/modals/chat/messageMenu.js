// messageMenuSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  position: null,
  activeMessageId: null,
  isSender: false,
};

const messageMenuSlice = createSlice({
  name: "messageMenu",
  initialState,
  reducers: {
    openMessageMenuModal: (state, action) => {
      state.isOpen = true;
      if (action.payload)
      state.position = action.payload.position;
      state.activeMessageId = action.payload.activeMessageId;
      state.isSender = action.payload.isSender;
    },
    closeMessageMenuModal: (state) => {
      state.isOpen = false;
      state.position = null;
      state.activeMessageId = null;
      state.isSender = false;
    },
  },
});

export const { openMessageMenuModal, closeMessageMenuModal } =
  messageMenuSlice.actions;
export default messageMenuSlice.reducer;
