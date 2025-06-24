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

  },
});

export const { setConvers, setChatMat, appendMessage } = conversSlice.actions;

export default conversSlice.reducer;