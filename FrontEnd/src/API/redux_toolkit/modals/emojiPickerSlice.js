import { createSlice } from "@reduxjs/toolkit";

const emojiPicker = createSlice({
  initialState: {
    isOpen: false,
  },
  name: "emojiPicker",
  reducers: {
    openEmojiPicker: (state) => {
      state.isOpen = true;
    },
    closeEmojiPicker: (state) => {
      state.isOpen = false;
    },
  },
});

export default emojiPicker.reducer;
export const { openEmojiPicker, closeEmojiPicker } = emojiPicker.actions;
