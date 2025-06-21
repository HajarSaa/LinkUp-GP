import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspace: null,
  onlineUsers: [],
};

// const workspaceSlice = createSlice({
//   name: "workspace",
//   initialState,
//   reducers: {
//     setWorkspace: (state, action) => {
//       state.workspace = action.payload;
//     },
//     clearWorkspace: (state) => {
//       state.workspace = null;
//       state.onlineUsers = [];
//     },
//     setOnlineUsers: (state, action) => {
//       state.onlineUsers = action.payload;
//     },
//     updateWorkspaceName: (state, action) => {
//       if (state.workspace) {
//         state.workspace.name = action.payload;
//       }
//     },
//     addMemberToWorkspace: (state, action) => {
//       if (state.workspace?.members) {
//         const exists = state.workspace.members.find(
//           (member) => member._id === action.payload._id
//         );
//         if (!exists) {
//           state.workspace.members.push(action.payload);
//         }
//       }
//     },
//     removeWorkspaceMember: (state, action) => {
//       if (state.workspace?.members) {
//         state.workspace.members = state.workspace.members.filter(
//           (member) => member._id !== action.payload
//         );
//       }
//     },
//     updateChannelInList: (state, action) => {
//       const updated = action.payload;
//       state.workspace.channels = state.workspace.channels.map((c) =>
//         c._id === updated._id ? updated : c
//       );
//     },
//     addChannelToList: (state, action) => {
//       state.workspace.channels.push(action.payload);
//     },
//     removeChannelFromList: (state, action) => {
//       state.workspace.channels = state.workspace.channels.filter(
//         (c) => c._id !== action.payload
//       );
//     },

//   },
// });


// export const { 
//   setWorkspace, 
//   clearWorkspace, 
//   setOnlineUsers, 
//   updateWorkspaceName,
//   addMemberToWorkspace, 
//   removeWorkspaceMember, 
//   updateChannelInList, 
//   addChannelToList, 
//   removeChannelFromList 
// } = workspaceSlice.actions;

// export default workspaceSlice.reducer;

// ✅ workspaceSlice — أضف setWorkspaceMembers

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
    updateChannelInList: (state, action) => {
      const updated = action.payload;
      state.workspace.channels = state.workspace.channels.map((c) =>
        c._id === updated._id ? updated : c
      );
    },
    addChannelToList: (state, action) => {
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
  addMemberToWorkspace,
  removeWorkspaceMember,
  updateChannelInList,
  addChannelToList,
  removeChannelFromList,
  setWorkspaceMembers
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
