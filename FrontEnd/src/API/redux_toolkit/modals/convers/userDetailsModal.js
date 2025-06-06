import { createSlice } from "@reduxjs/toolkit";

const userDetailsModal = createSlice({
  name: 'userDetailsModal',
  initialState: {
    isOpen: false,
    userData: null
  },
  reducers: {
    openUserDetailsModal: (state, action) => {
      state.isOpen = true;
      state.userData = action.payload;
    },
    closeUserDetailsModal: (state) => {
      state.isOpen = false;
      state.userData = null;
    }
  }
});

export const { openUserDetailsModal, closeUserDetailsModal } =
  userDetailsModal.actions;
export default userDetailsModal.reducer;