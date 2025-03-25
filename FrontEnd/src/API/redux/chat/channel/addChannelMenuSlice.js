import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false, // الحالة الأولية: مغلق
};

const addChannelMenuSlice = createSlice({
    name: "addChannelMenu",
    initialState,
    reducers: {
        openChannelMenu: (state) => {
            state.isOpen = true;
        },
        closeChannelMenu: (state) => {
            state.isOpen = false;
        },
    },
});

export const { openChannelMenu, closeChannelMenu } = addChannelMenuSlice.actions;
export default addChannelMenuSlice.reducer;
