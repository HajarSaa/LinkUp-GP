import { createSlice } from "@reduxjs/toolkit";

const conversSlice = createSlice({
  name: "conversation",
  initialState: {
    convers: null,
  },
  reducers: {
    setConvers: (state, action) => {
      state.convers = action.payload;
    },
  },
});

export const { setConvers } = conversSlice.actions;

export default conversSlice.reducer;
