import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
};

const channelMenuSlice = createSlice({
    name: "channelMenu",
    initialState,
    reducers: {
        openMenu: (state) => {
            state.isOpen = true;
        },
        closeMenu: (state) => {
            state.isOpen = false;
        },
    },
});

export const { openMenu, closeMenu } = channelMenuSlice.actions;
export default channelMenuSlice.reducer;
