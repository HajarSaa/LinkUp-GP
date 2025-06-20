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
    // updateChannelInList: (state, action) => {
    //   const updated = action.payload;
    //   state.workspace.channels = state.workspace.channels.map((c) =>
    //     c._id === updated._id ? updated : c
    //   );
    // },
    updateChannelInList: (state, action) => {
      const updated = action.payload;

      state.workspace.channels = state.workspace.channels.map((c) => {
        if (c._id !== updated._id) return c;

        if (
          typeof updated.members === "string" &&
          updated.members.startsWith("remove:")
        ) {
          const profileId = updated.members.split(":")[1];
          return {
            ...c,
            members: c.members.filter((id) => id !== profileId),
          };
        }

        return { ...c, ...updated };
      });
    },

    addChannelToList: (state, action) => {
      const channel = action.payload;
      channel.id = channel._id;
      state.workspace.channels.push(action.payload);
    },
    removeChannelFromList: (state, action) => {
      state.workspace.channels = state.workspace.channels.filter(
        (c) => c._id !== action.payload
      );
    },

  },
});


export const { 
  setWorkspace, 
  clearWorkspace, 
  setOnlineUsers, 
  updateWorkspaceName, 
  removeWorkspaceMember, 
  updateChannelInList, 
  addChannelToList, 
  removeChannelFromList 
} = workspaceSlice.actions;

export default workspaceSlice.reducer;