// src/API/redux_toolkit/ui/searchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSearchOpen: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    openSearch: (state) => {
      state.isSearchOpen = true;
    },
    closeSearch: (state) => {
      state.isSearchOpen = false;
    },
  },
});

export const { openSearch, closeSearch } = searchSlice.actions;
export default searchSlice.reducer;
