import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createChannel: { isOpen: false},
  invitePeople: { isOpen: false},
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
    //Start invite people
    openInvitePeople: (state) => {
      state.invitePeople.isOpen = true;
    },
    closeInvitePeople: (state) => {
      state.invitePeople.isOpen = false;
    }
    //End invite people
  },
});

export const {
  openCreateChannel,
  closeCreateChannel,
  openInvitePeople,
  closeInvitePeople,
} = modalsSlice.actions;
export default modalsSlice.reducer;
