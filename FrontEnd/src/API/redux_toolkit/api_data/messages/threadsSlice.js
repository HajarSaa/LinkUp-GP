import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  threads: [],
};

const threadsSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {
    setThreads: (state, action) => {
      state.threads = action.payload;
    },
    clearThreads: (state) => {
      state.threads = null;
    },
    addThreadMessage: (state, action) => {
      if (!state.threads) state.threads = [];
      state.threads.push(action.payload);
    },
    updateThreadMessageContent: (state, action) => {
      const { messageId, newContent, editedAt, updatedAt } = action.payload;

      if (!state.threads) return;

      const index = state.threads.findIndex((msg) => msg._id === messageId);
      if (index !== -1) {
        state.threads[index] = {
          ...state.threads[index],
          content: newContent,
          edited: true,
          editedAt,
          updatedAt,
        };
      }
    },
    removeThreadMessageById: (state, action) => {
      const { messageId } = action.payload;
      if (!state.threads) return;
      state.threads = state.threads.filter((msg) => msg._id !== messageId);
    },
    addReactionSocket: (state, action) => {
      const { messageId, emoji, userId } = action.payload;
      if (!state.threads) return;
      const msg = state.threads.find((m) => m._id === messageId);
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
    },
    removeReactionSocket: (state, action) => {
      const { messageId, emoji, userId } = action.payload;
      if (!state.threads) return;
      const msg = state.threads.find((m) => m._id === messageId);
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
    },
    setMessageReactionsFromSocket: (state, action) => {
      const { messageId, groupedReactions } = action.payload;
      if (!state.threads) return;
      const msg = state.threads.find((m) => m._id === messageId);
      if (msg) {
        msg.reactions = Object.entries(groupedReactions).map(
          ([emoji, { userIds, count }]) => ({ emoji, userIds, count })
        );
      }
    },
  },
});

export const {
  setThreads,
  clearThreads,
  addThreadMessage,
  updateThreadMessageContent,
  removeThreadMessageById,
  addReactionSocket,
  removeReactionSocket,
  setMessageReactionsFromSocket,
} = threadsSlice.actions;

export default threadsSlice.reducer;
