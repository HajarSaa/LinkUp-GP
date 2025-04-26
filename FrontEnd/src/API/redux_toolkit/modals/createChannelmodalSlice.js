import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createChannelOpen: false,
  addMembersOpen: false,
};

const createChannelModalSlice = createSlice({
  name: "createChannelModalSlice",
  initialState,
  reducers: {
    openCreateChannel: (state) => {
      state.createChannelOpen = true;
      state.addMembersOpen = false;
    },
    openAddMembers: (state) => {
      state.createChannelOpen = false;
      state.addMembersOpen = true;
    },
    closeCreateChannel: (state) => {
      state.createChannelOpen = false;
      state.addMembersOpen = false;
    },
  },
});

export const { openCreateChannel, openAddMembers, closeCreateChannel } =
  createChannelModalSlice.actions;
export default createChannelModalSlice.reducer;
