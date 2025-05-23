import { createSlice } from "@reduxjs/toolkit";

const conversSlice = createSlice({
  name: "conversation",
  initialState: {
    convers: null,
    loading: false,
    error: null,
  },
  reducers: {
    setConvers: (state, action) => {
      state.convers = action.payload;
    },
    setConLoading: (state, action) => {
      state.loading = action.payload;
    },
    setConError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setConvers, setConLoading, setConError } = conversSlice.actions;

export default conversSlice.reducer;
