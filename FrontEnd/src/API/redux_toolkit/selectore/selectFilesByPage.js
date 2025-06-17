import { createSelector } from "@reduxjs/toolkit";

export const selectFilesByPage = (page_id) =>
  createSelector(
    (state) => state.fileUpload.filesByPage,
    (filesByPage) => filesByPage[page_id] || []
  );
