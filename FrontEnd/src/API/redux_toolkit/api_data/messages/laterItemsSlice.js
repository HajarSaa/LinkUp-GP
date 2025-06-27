// laterItemsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  items: [],
  error: null,
};

const laterItemsSlice = createSlice({
  name: "laterItems",
  initialState,
  reducers: {
    setLaterItems: (state, action) => {
      state.items = action.payload;
    },
    addLaterItem: (state, action) => {
      const exists = state.items.find(item => item.messageId === action.payload.messageId);
      if (!exists) {
        state.items.unshift(action.payload);
      }
    },
    removeLaterItem: (state, action) => {
      const messageId = action.payload;
      state.items = state.items.filter(item => item.messageId !== messageId);
    },
    updateLaterItemStatus: (state, action) => {
      const { messageId, status } = action.payload;
      const item = state.items.find(i => i.messageId === messageId);
      if (item) item.status = status;
    },
    updateLaterItemReminder: (state, action) => {
      const { messageId, reminderAt } = action.payload;
      const item = state.items.find(i => i.messageId === messageId);
      if (item) item.reminderAt = reminderAt;
    },
    removeLaterReminder: (state, action) => {
      const messageId = action.payload;
      const item = state.items.find(i => i.messageId === messageId);
      if (item) item.reminderAt = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLaterItems,
  addLaterItem,
  removeLaterItem,
  updateLaterItemStatus,
  updateLaterItemReminder,
  removeLaterReminder,
  setLoading,
  setError,
} = laterItemsSlice.actions;

export default laterItemsSlice.reducer;
