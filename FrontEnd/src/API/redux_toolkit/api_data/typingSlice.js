
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  typingUsers: {}, // { roomId: [profileId, ...] }
  activeRoom: null,
};

const typingSlice = createSlice({
  name: "typing",
  initialState,
  reducers: {
    setTypingStatus: (state, action) => {
      const { room, profileId, typingStatus } = action.payload;
      if (!room || !profileId) return;

      if (!state.typingUsers[room]) {
        state.typingUsers[room] = [];
      }

      const currentList = state.typingUsers[room];

      if (typingStatus) {
        if (!currentList.includes(profileId)) {
          state.typingUsers[room].push(profileId);
        }
      } else {
        state.typingUsers[room] = currentList.filter(id => id !== profileId);
      }
    },

    clearTypingUsers: (state, action) => {
      const room = action.payload;
      delete state.typingUsers[room];
    },

    setActiveTypingRoom: (state, action) => {
      state.activeRoom = action.payload;
    },
  },
});

export const { setTypingStatus, clearTypingUsers, setActiveTypingRoom } = typingSlice.actions;
export default typingSlice.reducer;
