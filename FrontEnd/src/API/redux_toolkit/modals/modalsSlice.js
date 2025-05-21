import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createChannel: { createChannelOpen: false, addMembersOpen: false },
};

const modalsSlice = createSlice({
  name: "modalsSlice",
  initialState,
  reducers: {
    //Start Create Channels
    openCreateChannel: (state) => {
      state.createChannel.createChannelOpen = true;
      state.createChannel.addMembersOpen = false;
    },
    openAddMembers: (state) => {
      state.createChannel.createChannelOpen = false;
      state.createChannel.addMembersOpen = true;
    },
    closeCreateChannel: (state) => {
      state.createChannel.createChannelOpen = false;
      state.createChannel.addMembersOpen = false;
    },
    //End Create Channels
  },
});

export const { openCreateChannel, openAddMembers, closeCreateChannel } =
  modalsSlice.actions;
export default modalsSlice.reducer;
