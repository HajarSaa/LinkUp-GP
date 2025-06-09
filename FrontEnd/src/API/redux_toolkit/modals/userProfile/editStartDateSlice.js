import { createSlice } from "@reduxjs/toolkit";

const editStartDateSlice = createSlice({
  name: "editStartDate",
  initialState: {
    isOpen: false,
    data: null,
  },
  reducers: {
    openEditStartDateModal: (state, action) => {
      state.isOpen = true;
      state.data = action.payload;
    },
    closeEditStartDateModal: (state) => {
      state.isOpen = false;
      state.data = null;
    },
  },
});

export const { openEditStartDateModal, closeEditStartDateModal } =
  editStartDateSlice.actions;
export default editStartDateSlice.reducer;
