import { createSlice } from "@reduxjs/toolkit";

const addButtonModalSlice = createSlice({
  name: "AddButtonModalSlice",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openAddButtonModal: (state) => {
      state.isOpen = true;
    },
    closeAddButtonModal: (state) => {
      state.isOpen = false;
    },
  },
});

export default addButtonModalSlice.reducer;
export const { openAddButtonModal, closeAddButtonModal } =
  addButtonModalSlice.actions;
