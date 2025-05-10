import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspace: null,
  loading: false,
  error: null,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspace: (state, action) => {
      state.workspace = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearWorkspace: (state) => {
      state.workspace = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setWorkspace, setLoading, setError, clearWorkspace } =
  workspaceSlice.actions;

export default workspaceSlice.reducer;
