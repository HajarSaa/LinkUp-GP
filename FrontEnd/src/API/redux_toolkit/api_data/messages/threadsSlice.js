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
  },
});

export const { setThreads, clearThreads } = threadsSlice.actions;
export default threadsSlice.reducer;
