import { createSlice } from "@reduxjs/toolkit";

const editMessageSlice = createSlice({
  name: "editMessageSlice",
  initialState: {
    isEditing: false,
    messageId: null,
    messageText: "",
    isInThread: false,
  },
  reducers: {
    showEditMessageInput(state, action) {
      state.isEditing = true;
      state.messageId = action.payload.messageId;
      state.messageText = action.payload.messageText;
      state.isInThread = action.payload.isInThread;
    },
    closeEditMessageInput(state) {
      state.isEditing = false;
      state.messageId = null;
      state.messageText = "";
      state.isInThread = false;
    },
  },
});

export const { showEditMessageInput, closeEditMessageInput } =
  editMessageSlice.actions;
export default editMessageSlice.reducer;
