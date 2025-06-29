import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const pinnedChannelMessagesSlice = createSlice({
  name: "pinnedChannelMessages",
  initialState,
  reducers: {
    setChannelPinnedMessages: (state, action) => {
      const { channel_id, messages } = action.payload;
      state[channel_id] = messages;
    },
  },
});

export const { setChannelPinnedMessages } = pinnedChannelMessagesSlice.actions;

export default pinnedChannelMessagesSlice.reducer;
