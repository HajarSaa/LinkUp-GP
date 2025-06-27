
// ✅ 1. src/redux_toolkit/api_data/messages/messageReactionsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const messageReactionsSlice = createSlice({
  name: "messageReactions",
  initialState: {},
  reducers: {
    setMessageReactions: (state, action) => {
      const { messageId, groupedReactions } = action.payload;
      console.log("📥 setting groupedReactions from server for:", messageId, groupedReactions);
      state[messageId] = groupedReactions;
    },

    updateFromSocket: (state, action) => {
      const { messageId, emoji, userId, action: reactionAction } = action.payload;

      if (!messageId || !emoji || !userId || !reactionAction) return;

      if (!state[messageId]) {
        state[messageId] = {};
      }

      if (!state[messageId][emoji]) {
        state[messageId][emoji] = {
          count: 0,
          userIds: [],
        };
      }

      const reaction = state[messageId][emoji];
      const alreadyReacted = reaction.userIds.includes(userId);

      if (reactionAction === "added" && !alreadyReacted) {
        reaction.count += 1;
        reaction.userIds.push(userId);
      }

      if (reactionAction === "removed" && alreadyReacted) {
        reaction.count -= 1;
        reaction.userIds = reaction.userIds.filter((id) => id !== userId);
        if (reaction.count === 0) {
          delete state[messageId][emoji];
        }
      }
      console.log("🌀 updateFromSocket applied:", JSON.stringify(state[messageId]));
    },

  },
});

export const { setMessageReactions, updateFromSocket } = messageReactionsSlice.actions;
export default messageReactionsSlice.reducer;