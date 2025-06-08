import { createSlice } from "@reduxjs/toolkit";

const editUserProfileSlice = createSlice({
  name: "editUserProfile",
  initialState: {
    isOpen: false,
    myData: null,
    focusField: null,
  },
  reducers: {
    openEditUserProfile: (state, action) => {
      state.isOpen = true;
      state.myData = action.payload.data;
      state.focusField = action.payload.focusField;
    },
    closeEditUserProfile: (state) => {
      state.isOpen = false;
      state.myData = null;
      state.focusField = null;
    },
  },
});
export const { openEditUserProfile, closeEditUserProfile } = editUserProfileSlice.actions;
export default editUserProfileSlice.reducer;