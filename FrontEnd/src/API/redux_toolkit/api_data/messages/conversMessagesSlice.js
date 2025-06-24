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
  },
});

export const { setConversMessages } = conversMessagesSlice.actions;

export default conversMessagesSlice.reducer;
