import { createSlice } from "@reduxjs/toolkit";

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState: {
    files: [], // [{ previewURL, name, type, size, progress, uploading }]
    responseData: [],
  },
  reducers: {
    addFile(state, action) {
      state.files.push({ ...action.payload, status: "pending" });
    },
    updateFileProgress(state, action) {
      const { previewURL, progress } = action.payload;
      const file = state.files.find((f) => f.previewURL === previewURL);
      if (file) {
        file.progress = progress;
        if (progress >= 100) {
          file.uploading = false;
        }
      }
    },
    setFileStatus(state, action) {
      const { previewURL, status } = action.payload;
      const file = state.files.find((f) => f.previewURL === previewURL);
      if (file) {
        file.status = status;
      }
    },

    addResponse: (state, action) => {
      console.log(action.payload);
      state.responseData.push(action.payload);
    },
    clearFiles(state) {
      state.files = [];
    },
    removeFile(state, action) {
      const previewURL = action.payload;
      state.files = state.files.filter(
        (file) => file.previewURL !== previewURL
      );
    },
  },
});

export const {
  addFile,
  updateFileProgress,
  removeFile,
  addResponse,
  clearFiles,
  setFileStatus,
} = fileUploadSlice.actions;

export default fileUploadSlice.reducer;
