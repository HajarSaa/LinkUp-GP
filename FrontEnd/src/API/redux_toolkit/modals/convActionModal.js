import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const convActionModalSlice = createSlice({
  name: "convActionModal",
  initialState,
  reducers: {
    openConvActionModal: (state) => {
      state.isOpen = true;
    },
    closeConvActionModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openConvActionModal, closeConvActionModal } =
  convActionModalSlice.actions;
export default convActionModalSlice.reducer;
