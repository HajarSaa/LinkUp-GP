import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspace: null,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspace: (state, action) => {
      state.workspace = action.payload;
    },
    clearWorkspace: (state) => {
      state.workspace = null;
    },
  },
});

export const { setWorkspace, clearWorkspace } = workspaceSlice.actions;

export default workspaceSlice.reducer;
