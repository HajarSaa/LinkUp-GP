import { createSlice } from "@reduxjs/toolkit";

const uploadUserImageSlice = createSlice({
  name: "uploadUserImageSlice",
  initialState: {
    isOpen: false,
    userData: null,
  },
  reducers: {
    openUploadUserImageModal: (state, action) => {
      state.isOpen = true;
      state.userData = action.payload;
    },
    closeUploadUserImageModal: (state) => {
      state.isOpen = false;
      state.userData = null;
    },
  },
});

export const { openUploadUserImageModal, closeUploadUserImageModal } =
  uploadUserImageSlice.actions;
export default uploadUserImageSlice.reducer;
