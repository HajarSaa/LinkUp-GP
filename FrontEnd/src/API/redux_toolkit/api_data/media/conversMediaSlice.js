import { createSlice } from "@reduxjs/toolkit";

const conversMediaSlice = createSlice({
  name: "conversMedia",
  initialState: {
    conversMedia: [],
  },
  reducers: {
    setConversMedia: (state, action) => {
      state.conversMedia = action.payload;
    },
  },
});
export const { setConversMedia } = conversMediaSlice.actions;
export default conversMediaSlice.reducer;
