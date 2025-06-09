import { createSlice } from "@reduxjs/toolkit";

const userMenuSlice = createSlice({
  name: "userMenu",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openUserMenuModal: (state) => {
      state.isOpen = true;
    },
    closeUserMenuModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openUserMenuModal, closeUserMenuModal } =
  userMenuSlice.actions;
export default userMenuSlice.reducer;
