import { createSlice } from "@reduxjs/toolkit";

const recordingSlice = createSlice({
  name: "recordingSlice",
  initialState: { isRecording: false },
  reducers: {
    enableRecoding: (state) => {
      state.isRecording = true;
    },
    setNotRecording: (state) => {
      state.isRecording = false;
    },
  },
});

export default recordingSlice.reducer;
export const { enableRecoding, setNotRecording } = recordingSlice.actions;
