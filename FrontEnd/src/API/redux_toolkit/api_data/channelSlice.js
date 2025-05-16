import { createSlice } from "@reduxjs/toolkit";

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    channel: null,
    loading: false,
    error: null,
  },
  reducers: {
    setChannel: (state, action) => {
      state.channel = action.payload;
    },
    setChanLoading: (state, action) => {
      state.loading = action.payload;
    },
    setChanError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setChannel, setChanLoading, setChanError } = channelSlice.actions;

export default channelSlice.reducer;
