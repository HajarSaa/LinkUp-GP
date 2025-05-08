import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData } from "./currentUserThunk";

const initialState = {
  userData: null,
  workspaces: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const currentUserSlice = createSlice({
  name: "current_user",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.userData = null;
      state.workspaces = [];
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.userData = action.payload.user;
        state.workspaces = action.payload.workspaces;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
  },
});

export const { clearUserData } = currentUserSlice.actions;
export default currentUserSlice.reducer;
