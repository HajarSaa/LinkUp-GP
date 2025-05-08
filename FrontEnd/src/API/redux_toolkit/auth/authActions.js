import { createAsyncThunk } from "@reduxjs/toolkit";
import { signupService } from "../../services/authService";
import { setUser } from "./authSlice";

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const data = await signupService(userData);
      dispatch(setUser({ user: data.user, token: data.token }));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Signup failed");
    }
  }
);
