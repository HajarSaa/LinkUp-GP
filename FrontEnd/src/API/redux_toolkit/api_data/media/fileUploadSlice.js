import { createSlice } from "@reduxjs/toolkit";

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState: {
    pages: {}, // key: pageId => { files: [], responseData: [] }
  },
  reducers: {
    addFile(state, action) {
      const { pageId, file } = action.payload;
      state.pages[pageId] ??= { files: [], responseData: [] };
      state.pages[pageId].files.push({ ...file, status: "pending" });
    },


    setFileStatus(state, action) {
      const { pageId, previewURL, status } = action.payload;
      const file = state.pages[pageId]?.files.find(
        (f) => f.previewURL === previewURL
      );
      if (file) file.status = status;
    },

    addResponse(state, action) {
      const { pageId, responseFiles } = action.payload;
      state.pages[pageId] ??= { files: [], responseData: [] };

      responseFiles.forEach((file) => {
        const matchedFile = state.pages[pageId].files.find((f) =>
          file.fileUrl.includes(f.name)
        );
        if (matchedFile) matchedFile._id = file._id;
        state.pages[pageId].responseData.push(file._id);
      });
    },

    clearFiles(state, action) {
      const { pageId } = action.payload;
      delete state.pages[pageId];
    },

    removeFile(state, action) {
      const { pageId, previewURL } = action.payload;
      const page = state.pages[pageId];
      if (!page) return;

      const fileToRemove = page.files.find(
        (file) => file.previewURL === previewURL
      );
      const fileId = fileToRemove?._id;

      if (fileId) {
        page.responseData = page.responseData.filter((id) => id !== fileId);
      }

      page.files = page.files.filter((file) => file.previewURL !== previewURL);
    },
  },
});

export const {
  addFile,
  removeFile,
  addResponse,
  clearFiles,
  setFileStatus,
} = fileUploadSlice.actions;

export default fileUploadSlice.reducer;
