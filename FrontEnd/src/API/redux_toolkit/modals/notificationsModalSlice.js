import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
};

const notificationsModalSlice = createSlice({
    name: "notificationsModal",
    initialState,
    reducers: {
        openNotificationsModal: (state) => {
            state.isOpen = true;
        },
        closeNotificationsModal: (state) => {
            state.isOpen = false;
        },
    },
});

export const { openNotificationsModal, closeNotificationsModal } = notificationsModalSlice.actions;
export default notificationsModalSlice.reducer;
