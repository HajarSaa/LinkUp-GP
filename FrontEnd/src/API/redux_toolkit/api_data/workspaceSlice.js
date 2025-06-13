// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   workspace: null,
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
//     },
//   },
// });

// export const { setWorkspace, clearWorkspace} = workspaceSlice.actions;

// export default workspaceSlice.reducer;

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
