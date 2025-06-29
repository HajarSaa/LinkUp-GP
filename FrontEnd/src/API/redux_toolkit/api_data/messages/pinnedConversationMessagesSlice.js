import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const pinnedConversationMessagesSlice = createSlice({
  name: "pinnedChannelMessages",
  initialState,
  reducers: {
    setConverationPinnedMessages: (state, action) => {
      const { convers_id, messages } = action.payload;
      state[convers_id] = messages;
    },
  },
});

export const { setConverationPinnedMessages } =
  pinnedConversationMessagesSlice.actions;

export default pinnedConversationMessagesSlice.reducer;
