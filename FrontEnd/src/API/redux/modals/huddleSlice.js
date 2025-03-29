import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const huddleModalSlice = createSlice({
  name: "huddleModal",
  initialState,
  reducers: {
    openHuddleModal: (state) => {
      state.isOpen = true;
    },
    closeHuddleModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openHuddleModal, closeHuddleModal } = huddleModalSlice.actions;
export default huddleModalSlice.reducer;
