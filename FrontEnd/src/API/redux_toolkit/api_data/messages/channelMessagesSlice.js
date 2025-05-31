import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messagesByChannel: {},
};

const channelMessagesSlice = createSlice({
  name: "channelMessages",
  initialState,
  reducers: {
    setChannelMessages: (state, action) => {
      const { channel_id, messages } = action.payload;
      state.messagesByChannel[channel_id] = messages;
    },
    addMessageToChannel: (state, action) => {
      const { channel_id, message } = action.payload;
      if (state.messagesByChannel[channel_id]) {
        state.messagesByChannel[channel_id].unshift(message);
      } else {
        state.messagesByChannel[channel_id] = [message];
      }
    },
    clearChannelMessages: (state, action) => {
      const { channel_id } = action.payload;
      delete state.messagesByChannel[channel_id];
    },
  },
});

export const { setChannelMessages, addMessageToChannel, clearChannelMessages } =
  channelMessagesSlice.actions;

export default channelMessagesSlice.reducer;
