import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.data = action.payload;
    },
    clearUserProfile: (state) => {
      state.data = null;
    },
    updateUserStatus: (state, action) => {
      if (state.data && state.data.user === action.payload.userId) {
        state.data.status = action.payload.status;
        state.data.customStatus = action.payload.customStatus;
        state.data.lastActive = action.payload.lastActive;
      }
    },
  },
});

export const { setUserProfile, clearUserProfile, updateUserStatus } = userProfileSlice.actions;
export default userProfileSlice.reducer;