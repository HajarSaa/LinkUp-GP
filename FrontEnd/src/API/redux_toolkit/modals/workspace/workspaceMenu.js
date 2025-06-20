import { createSlice } from "@reduxjs/toolkit";

const workspaceMenuSlice = createSlice({
  name: "workspaceMenu",
  initialState: {
    isOpen: false,
    data: null,
    renameModal: {
      isOpen: false,
      data: null,
    },
    deleteModal: {
      isOpen: false,
      data: null,
    },
  },
  reducers: {
    openWorkspaceMenu: (state, action) => {
      state.isOpen = true;
      state.data = action.payload || null;
    },
    // open rename modal
    openRenameWorkModal: (state, action) => {
      state.isOpen = false;
      state.renameModal.isOpen = true;
      state.renameModal.data = action.payload;
    },
    //open delete modal
    openDeleteModal: (state, action) => {
      state.isOpen = false;
      state.deleteModal.isOpen = true;
      state.deleteModal.data = action.payload;
    },
    closeWorkspaceMenu: (state) => {
      state.isOpen = false;
      state.renameModal.isOpen = false;
      state.deleteModal.isOpen = false;
      state.data = null;
      state.renameModal.data = null;
      state.deleteModal.data = null;
    },
  },
});

export const {
  openWorkspaceMenu,
  openDeleteModal,
  openRenameWorkModal,
  closeWorkspaceMenu,
} = workspaceMenuSlice.actions;
export default workspaceMenuSlice.reducer;
