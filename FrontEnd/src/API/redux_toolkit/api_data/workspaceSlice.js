import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspace: null,
  onlineUsers: [],
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
      state.onlineUsers = [];
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    updateWorkspaceName: (state, action) => {
      if (state.workspace) {
        state.workspace.name = action.payload;
      }
    },
    removeWorkspaceMember: (state, action) => {
      if (state.workspace?.members) {
        state.workspace.members = state.workspace.members.filter(
          (member) => member._id !== action.payload
        );
      }
    },
  },
});


export const { setWorkspace, clearWorkspace, setOnlineUsers, updateWorkspaceName, removeWorkspaceMember, } = workspaceSlice.actions;

export default workspaceSlice.reducer;