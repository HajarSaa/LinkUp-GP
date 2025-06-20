import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  browseChannels: [],
};

const browseChannels = createSlice({
  name: "browseChannels",
  initialState,
  reducers: {
    setBrowseChannels: (state, action) => {
      state.browseChannels = action.payload;
    },
    clearBrowseChannels: (state) => {
      state.browseChannels = null;
    },
  },
});

export const { setBrowseChannels, clearBrowseChannels } = browseChannels.actions;

export default browseChannels.reducer;
