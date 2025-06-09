import { createSlice } from "@reduxjs/toolkit";

const editContactSlice = createSlice({
  name: 'editContact',
  initialState: {
    isOpen: false,
    data: null,
  },
  reducers: {
    openEditContactModal: (state, action) => {
      state.isOpen = true;
      state.data = action.payload;
    },
    closeEditContactModal: (state) => {
      state.isOpen = false;
      state.data = null;
    },
  },
});

export const { openEditContactModal, closeEditContactModal } = editContactSlice.actions;
export default editContactSlice.reducer;