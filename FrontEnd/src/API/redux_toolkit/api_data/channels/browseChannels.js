import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  browseChannels: [],
};

const browseChannels = createSlice({
  name: "browseChannels",
  initialState,
  reducers: {
    setBrowseChannels: (state, action) => {
      state.browseChannels = action.payload;
    },
    clearBrowseChannels: (state) => {
      state.browseChannels = [];
    },
    updateChannelMembers: (state, action) => {
      const { channelId, profileId, type } = action.payload;
      const channel = state.browseChannels.find((c) => c.id === channelId);
      if (!channel) return;

      if (type === "add") {
        if (!channel.members.includes(profileId)) {
          channel.members.push(profileId);
        }
      } else if (type === "remove") {
        channel.members = channel.members.filter((id) => id !== profileId);
      }
    },
    addChannelToBrowseList: (state, action) => {
      const exists = state.browseChannels.find((c) => c.id === action.payload.id);
      if (!exists) {
        state.browseChannels.push(action.payload);
      }
    },
    removeChannelFromBrowseList: (state, action) => {
      state.browseChannels = state.browseChannels.filter(
        (c) => c.id !== action.payload
      );
    },

  },
});

export const {
  setBrowseChannels,
  clearBrowseChannels,
  updateChannelMembers,
  addChannelToBrowseList,
  removeChannelFromBrowseList,
} = browseChannels.actions;

export default browseChannels.reducer;
