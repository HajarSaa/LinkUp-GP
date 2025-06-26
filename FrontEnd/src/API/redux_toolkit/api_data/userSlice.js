import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set initial user data (e.g. on login)
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },

    // Update profile fields like userName, email, about, status, photo etc.
    updateUserProfile: (state, action) => {
      if (!state.currentUser) return;

      const allowed = ["userName", "email", "about", "status", "photo"];
      for (const key of allowed) {
        if (key in action.payload) {
          state.currentUser[key] = action.payload[key];
        }
      }
    },

    // Update profile photo only
    updateUserPhoto: (state, action) => {
      if (!state.currentUser) return;
      state.currentUser.photo = action.payload;
    },
  },
});

export const { setUser, updateUserProfile, updateUserPhoto } = userSlice.actions;
export default userSlice.reducer;
