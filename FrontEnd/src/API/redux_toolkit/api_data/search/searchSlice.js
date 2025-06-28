// redux_toolkit/api_data/searchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.messages = action.payload;
    },
    clearSearchResults: (state) => {
      state.messages = [];
    },
  },
});

export const { setSearchResults, clearSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
