import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const sideBarModalSlice = createSlice({
  name: "sideBarModalModal",
  initialState,
  reducers: {
    openSideBarModal: (state) => {
      state.isOpen = true;
    },
    closeConvActionModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openSideBarModal, closeConvActionModal } =
  sideBarModalSlice.actions;
export default sideBarModalSlice.reducer;
