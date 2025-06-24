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
      state.messagesByChannel[channel_id] = [...messages];
    },
    appendMessage: (state, action) => {
      const { channel_id, message } = action.payload;
      if (!state.messagesByChannel[channel_id]) {
        state.messagesByChannel[channel_id] = [];
      }
      state.messagesByChannel[channel_id].unshift(message); // or push()
    }

  },
});

export const { setChannelMessages, appendMessage} =
  channelMessagesSlice.actions;

export default channelMessagesSlice.reducer;
