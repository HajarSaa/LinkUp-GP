import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all: [],
  mentions: [],
  threads: [],
  reactions: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setAllNotifications: (state, action) => {
      console.log("Setting ALL notifs:", action.payload);
      state.all = action.payload;
    },
    setMentionNotifications: (state, action) => {
      state.mentions = action.payload;
    },
    setThreadNotifications: (state, action) => {
      state.threads = action.payload;
    },
    setReactionNotifications: (state, action) => {
      state.reactions = action.payload;
    },
    setNotificationsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setNotificationsError: (state, action) => {
      state.error = action.payload;
    },
    addNotification: (state, action) => {
        const { type, message } = action.payload;

        if (type === "mention") {
            state.mentions.push(message);
        } else if (type === "thread") {
            state.threads.push(message);
        } else if (type === "reaction") {
            state.reactions.push(message);
        }

        state.all.push(message); // add to "All" regardless of type
        },

  },
});

export const {
  setAllNotifications,
  setMentionNotifications,
  setThreadNotifications,
  setReactionNotifications,
  setNotificationsLoading,
  setNotificationsError,
  addNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
