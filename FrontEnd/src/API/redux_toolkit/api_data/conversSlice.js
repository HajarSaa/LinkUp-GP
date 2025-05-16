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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setConvers, setLoading, setError } = conversSlice.actions;

export default conversSlice.reducer;
