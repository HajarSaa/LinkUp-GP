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
    removeMessageById: (state, action) => {
      const { messageId } = action.payload;
      Object.keys(state.messagesByChannel).forEach((channelId) => {
        state.messagesByChannel[channelId] = state.messagesByChannel[channelId].filter(
          (msg) => msg._id !== messageId
        );
      });
    },
    addReactionSocket: (state, action) => {
      const { messageId, emoji, userId } = action.payload;
      Object.values(state.messagesByChannel).forEach((messages) => {
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
      Object.values(state.messagesByChannel).forEach((messages) => {
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
      Object.values(state.messagesByChannel).forEach((messages) => {
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
  setChannelMessages, 
  appendMessage, 
  updateMessageContent, 
  removeMessageById, 
  addReactionSocket,
  removeReactionSocket,
   setMessageReactionsFromSocket,
} =
  channelMessagesSlice.actions;

export default channelMessagesSlice.reducer;
