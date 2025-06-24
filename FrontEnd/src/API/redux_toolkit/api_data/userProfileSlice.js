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
  },
});

export const { setUserProfile, clearUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;