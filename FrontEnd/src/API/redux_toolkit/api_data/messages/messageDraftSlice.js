// messageDraftSlice.js
import { createSlice } from "@reduxjs/toolkit";

const messageDraftSlice = createSlice({
  name: "messageDraft",
  initialState: {},
  reducers: {
    saveDraft(state, action) {
      const { pageId, text } = action.payload;
      state[pageId] = text;
    },
    clearDraft(state, action) {
      const { pageId } = action.payload;
      delete state[pageId];
    },
  },
});

export const { saveDraft, clearDraft } = messageDraftSlice.actions;
export default messageDraftSlice.reducer;
