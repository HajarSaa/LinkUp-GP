// historySlice.js
import { createSlice } from "@reduxjs/toolkit";

// حاول ترجع البيانات من localStorage الأول
const savedState = JSON.parse(localStorage.getItem("nav-history"));

const initialState = savedState || {
  history: [],
  currentIndex: -1,
};

const historySlice = createSlice({
  name: "navigationHistory",
  initialState,
  reducers: {
    pushToHistory: (state, action) => {
      const newHistory = state.history.slice(0, state.currentIndex + 1);
      newHistory.push(action.payload);
      state.history = newHistory;
      state.currentIndex++;

      localStorage.setItem("nav-history", JSON.stringify(state)); // ← تخزين
    },
    goBack: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex--;
        localStorage.setItem("nav-history", JSON.stringify(state));
      }
    },
    goForward: (state) => {
      if (state.currentIndex < state.history.length - 1) {
        state.currentIndex++;
        localStorage.setItem("nav-history", JSON.stringify(state));
      }
    },
    clearHistory: (state) => {
      state.history = [];
      state.currentIndex = -1;
      localStorage.removeItem("nav-history");
    },
  },
});

export const { pushToHistory, goBack, goForward, clearHistory } = historySlice.actions;
export default historySlice.reducer;
