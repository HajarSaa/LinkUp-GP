import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const forwardModalSlice = createSlice({
  name: "forwardModal",
  initialState,
  reducers: {
    openForwardModal: (state) => {
      state.isOpen = true;
    },
    closeForwardModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openForwardModal, closeForwardModal } =
  forwardModalSlice.actions;
export default forwardModalSlice.reducer;
