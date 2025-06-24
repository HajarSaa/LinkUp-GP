import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  threads: null,
};

const threadsSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {
    setThreads: (state, action) => {
      state.threads = action.payload;
    },
    clearThreads: (state) => {
      state.threads = null;
    },
    addThreadMessage: (state, action) => {
      if (!state.threads) state.threads = [];
      state.threads.push(action.payload);
    },
  },
});

export const { setThreads, clearThreads, addThreadMessage } = threadsSlice.actions;
export default threadsSlice.reducer;
