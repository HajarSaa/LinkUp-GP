import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    user: null,
};

const profilePanelSlice = createSlice({
    name: "profilePanel",
    initialState,
    reducers: {
        openProfilePanel: (state, action) => {
            state.isOpen = true;
            state.user = action.payload;
        },
        closeProfilePanel: (state) => {
            state.isOpen = false;
            state.user = null;
        },
    },
});

export const { openProfilePanel, closeProfilePanel } = profilePanelSlice.actions;
export default profilePanelSlice.reducer;
