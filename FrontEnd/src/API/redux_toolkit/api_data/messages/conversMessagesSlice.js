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

      Object.values(state.messagesByConvers || {}).forEach((messages) => {
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
    addReactionSocket: (state, action) => {
      const { messageId, emoji, userId } = action.payload;
      Object.values(state.messagesByConvers).forEach((messages) => {
        const msg = messages.find((m) => m._id === messageId);
        if (msg) {
          if (!msg.reactions) msg.reactions = [];
          const existing = msg.reactions.find((r) => r.emoji === emoji);
          if (existing) {
            if (!existing.userIds.includes(userId)) {
              existing.userIds.push(userId);
              existing.count += 1;
            }
          } else {
            msg.reactions.push({ emoji, userIds: [userId], count: 1 });
          }
        }
      });
    },
    removeReactionSocket: (state, action) => {
      const { messageId, emoji, userId } = action.payload;
      Object.values(state.messagesByConvers).forEach((messages) => {
        const msg = messages.find((m) => m._id === messageId);
        if (msg && msg.reactions) {
          const index = msg.reactions.findIndex((r) => r.emoji === emoji);
          if (index !== -1) {
            const reaction = msg.reactions[index];
            reaction.userIds = reaction.userIds.filter((id) => id !== userId);
            reaction.count -= 1;
            if (reaction.count <= 0) {
              msg.reactions.splice(index, 1);
            }
          }
        }
      });
    },
    setMessageReactionsFromSocket: (state, action) => {
      const { messageId, groupedReactions } = action.payload;
      Object.values(state.messagesByConvers).forEach((messages) => {
        const msg = messages.find((m) => m._id === messageId);
        if (msg) {
          msg.reactions = Object.entries(groupedReactions).map(
            ([emoji, { userIds, count }]) => ({ emoji, userIds, count })
          );
        }
      });
    },
  },
});

export const {
  setConversMessages,
  appendMessage,
  updateMessageContent,
  removeMessageById,
  addReactionSocket,
  removeReactionSocket,
  setMessageReactionsFromSocket,
} = conversMessagesSlice.actions;

export default conversMessagesSlice.reducer;