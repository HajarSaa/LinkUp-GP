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
    setConversMessages: (state, action) => {
      const { conversation_id, messages } = action.payload;
      state.messagesByConversation[conversation_id] = messages;
    },
    setChatMat: (state, action) => {
      state.chatMate = action.payload;
    },
    updateChatMate: (state, action) => {
      if (!state.chatMate) return;
      Object.assign(state.chatMate, action.payload);
    },
  },
});

export const { setConvers, setChatMat, setConversMessages, updateChatMate } = conversSlice.actions;

export default conversSlice.reducer;