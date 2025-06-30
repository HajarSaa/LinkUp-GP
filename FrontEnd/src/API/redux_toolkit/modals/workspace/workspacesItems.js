import { createSlice } from "@reduxjs/toolkit";

const workspaceItemsModal = createSlice({
  name: "workspaceItems",
  initialState: {
    isOpen: false,
    position: { top: 0, left: 0 },
  },
  reducers: {
    openWorkspaceItemsModal: (state, action) => {
      state.isOpen = true;
      state.position = action.payload; // ← هنا بندي position مع الفتح
    },
    closeWorkspaceItemsModal: (state) => {
      state.isOpen = false;
      state.position = { top: 0, left: 0 }; // ← reset للمكان
    },
  },
});

export const { openWorkspaceItemsModal, closeWorkspaceItemsModal } =
  workspaceItemsModal.actions;
export default workspaceItemsModal.reducer;
