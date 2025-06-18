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
  },
});

export const { setWorkspace, clearWorkspace, setOnlineUsers } = workspaceSlice.actions;

export default workspaceSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   workspace: null,
//   userStatuses: {},
// };

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
//     setUserStatuses: (state, action) => {
//       state.userStatuses = action.payload; // ده هيكون object: { userId: { status, customStatus } }
//     },

//     updateUserStatus: (state, action) => {
//       const { userId, status, customStatus } = action.payload;
//       state.userStatuses[userId] = { status, customStatus };
//     },
//   },
// });

// export const { setWorkspace, clearWorkspace, setUserStatuses, updateUserStatus } = workspaceSlice.actions;

// export default workspaceSlice.reducer;

