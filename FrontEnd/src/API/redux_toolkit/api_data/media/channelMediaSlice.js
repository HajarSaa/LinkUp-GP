import { createSlice } from "@reduxjs/toolkit";


const channelMediaSlice = createSlice({
  name: "channelMedia",
  initialState: {
    channelMedia: []
  },
  reducers: {
    setChannelMedia: (state, action) => {
      state.channelMedia = action.payload;
    }
  }
});
export const { setChannelMedia } = channelMediaSlice.actions;
export default channelMediaSlice.reducer;