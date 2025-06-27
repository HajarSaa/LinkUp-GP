import { createSlice } from "@reduxjs/toolkit";

const messageReactionsSlice = createSlice({
  name: "messageReactions",
  initialState: {},
  reducers: {
    setMessageReactions: (state, action) => {
      const { messageId, groupedReactions } = action.payload;
      state[messageId] = groupedReactions;
    },
  },
});

export const { setMessageReactions } = messageReactionsSlice.actions;
export default messageReactionsSlice.reducer;
