import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMeService } from "../../services/authService";


export const fetchCurrentUser = createAsyncThunk(
  "current_user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMeService();
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  user: null,
  workspaces: [],
  isAuthenticated: false,
  loading: false,
  error: null,
  isFirstLoad: true, // <-- Added this
};

const currentUserSlice = createSlice({
  name: "current_user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.isFirstLoad = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.workspaces = action.payload.workspaces;
        state.isAuthenticated = true;
        state.isFirstLoad = false;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch user data";
        state.isAuthenticated = false;
        state.isFirstLoad = false;
      });
  },
});

export default currentUserSlice.reducer;
