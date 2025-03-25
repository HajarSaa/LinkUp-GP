import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    createChannelOpen: false,
    addMembersOpen: false,
};

const modalSlice = createSlice({
    name: "modal",
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
        closeModals: (state) => {
            state.createChannelOpen = false;
            state.addMembersOpen = false;
        },
    },
});

export const { openCreateChannel, openAddMembers, closeModals } = modalSlice.actions;
export default modalSlice.reducer;
