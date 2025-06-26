import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspace: null,
  onlineUsers: [],
  logged_user : {},
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setSelectedWorkspace: (state, action) => {
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
    addMemberToWorkspace: (state, action) => {
      if (state.workspace?.members) {
        const exists = state.workspace.members.find(
          (member) => member._id === action.payload._id
        );
        if (!exists) {
          state.workspace.members.push(action.payload);
        }
      }
    },
    removeWorkspaceMember: (state, action) => {
      if (state.workspace?.members) {
        state.workspace.members = state.workspace.members.filter(
          (member) => member._id !== action.payload
        );
      }
    },
    setWorkspaceMembers: (state, action) => {
      if (state.workspace) {
        state.workspace.members = action.payload;
      }
    },
    // updateChannelInList: (state, action) => {
    //   const updated = action.payload;
    //   state.workspace.channels = state.workspace.channels.map((c) =>
    //     c._id === updated._id ? updated : c
    //   );
    // },

    updateChannelInList: (state, action) => {
      const { _id, members } = action.payload;
      const channel = state.workspace.channels.find((c) => c._id === _id);
      if (!channel) return;

      if (typeof members === "string" && members.startsWith("add:")) {
        const idToAdd = members.split(":")[1];
        if (!channel.members.includes(idToAdd)) {
          channel.members.push(idToAdd);
        }
      } else if (typeof members === "string" && members.startsWith("remove:")) {
        const idToRemove = members.split(":")[1];
        channel.members = channel.members.filter((id) => id !== idToRemove);
      } else {
        Object.assign(channel, action.payload); // fallback update
      }
    },

    addChannelToList: (state, action) => {
      state.workspace.channels.push(action.payload);
    },
    removeChannelFromList: (state, action) => {
      state.workspace.channels = state.workspace.channels.filter(
        (c) => c._id !== action.payload
      );
    },
    updateMemberProfile: (state, action) => {
      const updated = action.payload;
      const memberIndex = state.workspace.members.findIndex(
        (m) => m._id === updated._id
      );
      if (memberIndex !== -1) {
        state.workspace.members[memberIndex] = {
          ...state.workspace.members[memberIndex],
          ...updated,
        };
      }
    },

  },
});


export const {
  setSelectedWorkspace,
  clearWorkspace,
  setOnlineUsers,
  updateWorkspaceName,
  addMemberToWorkspace,
  removeWorkspaceMember,
  updateChannelInList,
  addChannelToList,
  removeChannelFromList,
  setWorkspaceMembers,
  updateMemberProfile,

} = workspaceSlice.actions;

export default workspaceSlice.reducer;
