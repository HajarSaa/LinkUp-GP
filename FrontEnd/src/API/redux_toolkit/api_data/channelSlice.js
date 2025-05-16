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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setChannel, setLoading, setError } = channelSlice.actions;

export default channelSlice.reducer;
