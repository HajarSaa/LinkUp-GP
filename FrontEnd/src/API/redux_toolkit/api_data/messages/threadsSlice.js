import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  threads: [],
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
    updateThreadMessageContent: (state, action) => {
      const { messageId, newContent, editedAt, updatedAt } = action.payload;

      if (!state.threads) return;

      const index = state.threads.findIndex((msg) => msg._id === messageId);
      if (index !== -1) {
        state.threads[index] = {
          ...state.threads[index],
          content: newContent,
          edited: true,
          editedAt,
          updatedAt,
        };
      }
    },
    removeThreadMessageById: (state, action) => {
      const { messageId } = action.payload;
      if (!state.threads) return;
      state.threads = state.threads.filter((msg) => msg._id !== messageId);
    },
  },
});

export const {
  setThreads,
  clearThreads,
  addThreadMessage,
  updateThreadMessageContent,
  removeThreadMessageById,
} = threadsSlice.actions;

export default threadsSlice.reducer;
