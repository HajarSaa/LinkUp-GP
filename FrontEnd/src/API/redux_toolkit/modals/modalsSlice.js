import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createChannel: { isOpen: false },
  inviteToWork: { isOpen: false },
  inviteToChannel: { isOpen: false, channelData: null },
};

const modalsSlice = createSlice({
  name: "modalsSlice",
  initialState,
  reducers: {
    //Start Create Channels
    openCreateChannel: (state) => {
      state.createChannel.isOpen = true;
    },
    closeCreateChannel: (state) => {
      state.createChannel.isOpen = false;
    },
    //End Create Channels
    // ======================================================
    //Start invite to workspace
    openInviteWork: (state) => {
      state.inviteToWork.isOpen = true;
    },
    closeInviteWork: (state) => {
      state.inviteToWork.isOpen = false;
    },
    //End invite to workspace
    // ======================================================
    //Start invite to channel
    openInviteChannel: (state, actions) => {
      state.inviteToChannel.isOpen = true;
      state.inviteToChannel.channelData = actions.payload;
    },
    closeInviteChannel: (state) => {
      state.inviteToChannel.isOpen = false;
      state.inviteToChannel.channelData = null;
    },
    //End invite to channel
  },
});

export const {
  openCreateChannel,
  closeCreateChannel,
  openInviteWork,
  closeInviteWork,
  openInviteChannel,
  closeInviteChannel,
} = modalsSlice.actions;
export default modalsSlice.reducer;
