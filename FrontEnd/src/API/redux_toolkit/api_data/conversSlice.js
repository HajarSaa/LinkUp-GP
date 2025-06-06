import { createSlice } from "@reduxjs/toolkit";

const conversSlice = createSlice({
  name: "conversation",
  initialState: {
    convers: null,
    chatMate:null
  },
  reducers: {
    setConvers: (state, action) => {
      state.convers = action.payload;
    },
    setChatMat: (state, action) => {
      state.chatMate = action.payload;
    }
  },
});

export const { setConvers, setChatMat } = conversSlice.actions;

export default conversSlice.reducer;
