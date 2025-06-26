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
    updateViewedUserProfile: (state, action) => {
    if (!state.data) return;
    Object.assign(state.data, action.payload);
  }

  },
});

export const { setUserProfile, clearUserProfile, updateViewedUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;