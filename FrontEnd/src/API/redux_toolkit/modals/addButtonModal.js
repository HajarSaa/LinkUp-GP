import { createSlice } from "@reduxjs/toolkit";

const addButtonModalSlice = createSlice({
  name: "AddButtonModalSlice",
  initialState: {
    isOpen: false,
    position: null,
  },
  reducers: {
    openAddButtonModal: (state, action) => {
      state.isOpen = true;
      state.position = action.payload.position;
    },
    closeAddButtonModal: (state) => {
      state.isOpen = false;
      state.position = null;
    },
  },
});

export default addButtonModalSlice.reducer;
export const { openAddButtonModal, closeAddButtonModal } =
  addButtonModalSlice.actions;
