import { createSlice } from "@reduxjs/toolkit";

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    channel: null,
  },
  reducers: {
    setChannel: (state, action) => {
      state.channel = action.payload;
    },
    updateChannelMembers: (state, action) => {
      if (state.channel) {
        state.channel.members = action.payload;
      }
    },
  },
});

export const { setChannel, setChanLoading, setChanError, updateChannelMembers } = channelSlice.actions;

export default channelSlice.reducer;
