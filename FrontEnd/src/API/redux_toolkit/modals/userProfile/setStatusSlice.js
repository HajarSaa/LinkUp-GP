import { createSlice } from "@reduxjs/toolkit";

const setStatusSlice = createSlice({
  name: "setStatus",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openSetStatusModal: (state) => {
      state.isOpen = true;
    },
    closeSetStatusModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openSetStatusModal, closeSetStatusModal } =
  setStatusSlice.actions;
export default setStatusSlice.reducer;
