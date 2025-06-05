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
    }
  },
});

export const { setChannelMessages} =
  channelMessagesSlice.actions;

export default channelMessagesSlice.reducer;
