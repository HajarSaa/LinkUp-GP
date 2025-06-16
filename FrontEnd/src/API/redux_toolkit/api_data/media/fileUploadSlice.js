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
      const responseFiles = action.payload;

      responseFiles.forEach((file) => {
        // دور على الملف اللي ليه نفس الاسم أو أي مفتاح ربط
        const matchedFile = state.files.find((f) =>
          file.fileUrl.includes(f.name)
        );

        if (matchedFile) {
          matchedFile._id = file._id; // اربط الـ id بالميديا
        }

        // ضيف الـ id في الresponseData
        state.responseData.push(file._id);
      });
    },
    clearFiles(state) {
      state.files = [];
      state.responseData = [];
    },
    removeFile(state, action) {
      const previewURL = action.payload;

      // الخطوة 1: لاقي الملف
      const fileToRemove = state.files.find(
        (file) => file.previewURL === previewURL
      );

      // الخطوة 2: احفظ الـ id مؤقتًا قبل أي تعديل
      const fileId = fileToRemove?._id;

      // الخطوة 3: عدّل الـ responseData بناءً على الـ id المحفوظ
      if (fileId) {
        state.responseData = state.responseData.filter((id) => id !== fileId);
      }

      // الخطوة 4: احذف الملف من الستيت
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
