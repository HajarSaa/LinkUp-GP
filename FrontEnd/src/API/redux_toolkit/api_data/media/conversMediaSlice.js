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
    addConversMedia: (state, action) => {
      const exists = state.conversMedia.some(
        (file) => file._id === action.payload._id
      );
      if (!exists) state.conversMedia.push(action.payload);
    },
    removeConversMedia: (state, action) => {
      state.conversMedia = state.conversMedia.filter(
        (file) => file._id !== action.payload.fileId
      );
    },
  },
});

export const {
  setConversMedia,
  addConversMedia,
  removeConversMedia,
} = conversMediaSlice.actions;

export default conversMediaSlice.reducer;
