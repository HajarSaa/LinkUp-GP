import { createSlice } from "@reduxjs/toolkit";
const channelMediaSlice = createSlice({
  name: "channelMedia",
  initialState: {
    channelMedia: [],
  },
  reducers: {
    setChannelMedia: (state, action) => {
      state.channelMedia = action.payload;
    },
    addChannelMedia: (state, action) => {
      const exists = state.channelMedia.some(
        (file) => file._id === action.payload._id
      );
      if (!exists) state.channelMedia.push(action.payload);
    },
    removeChannelMedia: (state, action) => {
      state.channelMedia = state.channelMedia.filter(
        (file) => file._id !== action.payload.fileId
      );
    },
  },
});

export const {
  setChannelMedia,
  addChannelMedia,
  removeChannelMedia,
} = channelMediaSlice.actions;

export default channelMediaSlice.reducer;