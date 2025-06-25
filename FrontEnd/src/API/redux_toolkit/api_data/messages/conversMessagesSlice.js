import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messagesByConvers: {},
};

const conversMessagesSlice = createSlice({
  name: "conversMessages",
  initialState,
  reducers: {
    setConversMessages: (state, action) => {
      const { convers_id, messages } = action.payload;
      state.messagesByConvers[convers_id] = [...messages];
    },
    appendMessage: (state, action) => {
      const { conversation_id, message } = action.payload;
      if (!state.messagesByConvers[conversation_id]) {
        state.messagesByConvers[conversation_id] = [];
      }
      state.messagesByConvers[conversation_id].unshift(message);
    },
    updateMessageContent: (state, action) => {
      const { messageId, newContent, editedAt, updatedAt } = action.payload;

      Object.values(state.messagesByConvers).forEach((messages) => {
        const index = messages.findIndex((msg) => msg._id === messageId);
        if (index !== -1) {
          messages[index] = {
            ...messages[index],
            content: newContent,
            edited: true,
            editedAt,
            updatedAt,
          };
        }
      });
    },
    removeMessageById: (state, action) => {
      const { messageId } = action.payload;
      Object.keys(state.messagesByConvers).forEach((conversId) => {
        state.messagesByConvers[conversId] = state.messagesByConvers[conversId].filter(
          (msg) => msg._id !== messageId
        );
      });
    },
  },
});

export const { setConversMessages, appendMessage, updateMessageContent, removeMessageById } = conversMessagesSlice.actions;

export default conversMessagesSlice.reducer;
