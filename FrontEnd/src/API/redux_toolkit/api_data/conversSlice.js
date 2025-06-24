import { createSlice } from "@reduxjs/toolkit";

const conversSlice = createSlice({
  name: "conversation",
  initialState: {
    convers: null,
    chatMate:null,
    messagesByConversation: {},
  },
  reducers: {
    setConvers: (state, action) => {
      state.convers = action.payload;
    },
    setChatMat: (state, action) => {
      state.chatMate = action.payload;
    },
    appendMessage: (state, action) => {
      const { conversation_id, message } = action.payload;
      if (!state.messagesByConversation[conversation_id]) {
        state.messagesByConversation[conversation_id] = [];
      }
      state.messagesByConversation[conversation_id].unshift(message);
    },
    updateMessageContent: (state, action) => {
      const { messageId, newContent, editedAt, updatedAt } = action.payload;

      Object.values(state.messagesByConversation).forEach((messages) => {
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

  },
});

export const { setConvers, setChatMat, appendMessage, updateMessageContent } = conversSlice.actions;

export default conversSlice.reducer;