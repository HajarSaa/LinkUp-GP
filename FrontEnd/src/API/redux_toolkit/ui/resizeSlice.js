import { createSlice } from "@reduxjs/toolkit";

const resizeSlice = createSlice({
  name: "resizeSlice",
  initialState: { isResizable: true },
  reducers: {
    enableResizing: (state) => {
      state.isResizable = true;
    },
    disableResizing: (state) => {
      state.isResizable = false;
    },
  },
});

export default resizeSlice.reducer;
export const { enableResizing, disableResizing } = resizeSlice.actions;
