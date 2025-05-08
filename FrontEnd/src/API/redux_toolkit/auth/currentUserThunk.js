import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMeService } from "../../services/authService";

export const fetchUserData = createAsyncThunk(
  "current_user/fetchUserData",
  async () => {
    try {
      const response = await getMeService();
      return response.data;
    } catch (error) {
      return (error.response.data || error.message);
    }
  }
);
