import { createSlice } from "@reduxjs/toolkit";

const emojiPicker = createSlice({
  name: "emojiPicker",
  initialState: {
    isOpen: false,
    position: null,
    messageId: null,
  },
  reducers: {
    openEmojiPicker: (state, action) => {
      state.isOpen = true;
      state.position = action.payload.position;
      state.messageId = action.payload.messageId;
    },
    closeEmojiPicker: (state) => {
      state.isOpen = false;
      state.position = null;
      state.messageId = null;
    },
  },
});

export default emojiPicker.reducer;
export const { openEmojiPicker, closeEmojiPicker } = emojiPicker.actions;
