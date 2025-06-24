import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messagesByChannel: {},
};

const channelMessagesSlice = createSlice({
  name: "channelMessages",
  initialState,
  reducers: {
    setChannelMessages: (state, action) => {
      const { channel_id, messages } = action.payload;
      state.messagesByChannel[channel_id] = [...messages];
    },
    appendMessage: (state, action) => {
      const { channel_id, message } = action.payload;
      if (!state.messagesByChannel[channel_id]) {
        state.messagesByChannel[channel_id] = [];
      }
      state.messagesByChannel[channel_id].unshift(message); // or push()
    },
    updateMessageContent: (state, action) => {
      const { messageId, newContent, editedAt, updatedAt } = action.payload;

      Object.values(state.messagesByChannel).forEach((messages) => {
        const index = messages.findIndex((msg) => msg._id === messageId);
        if (index !== -1) {
          console.log("✅ Updating message in state:", messageId);
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

export const { setChannelMessages, appendMessage, updateMessageContent} =
  channelMessagesSlice.actions;

export default channelMessagesSlice.reducer;
