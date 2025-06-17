// inputMenuSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  position: null,
};

const inputMenuSlice = createSlice({
  name: "inputMenu",
  initialState,
  reducers: {
    openInputMenuModal: (state,action) => {
      state.isOpen = true;
      state.position = action.payload;
    },
    closeInputMenuModal: (state) => {
      state.isOpen = false;
      state.position = null;
    },
  },
});

export const { openInputMenuModal, closeInputMenuModal } =
  inputMenuSlice.actions;
export default inputMenuSlice.reducer;
