import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false, // حالة المودال مفتوح أو مغلق
};

const notificationsModelSlice = createSlice({
    name: "notificationsModel",
    initialState,
    reducers: {
        openNotificationsModel: (state) => {
            state.isOpen = true;
        },
        closeNotificationsModel: (state) => {
            state.isOpen = false;
        },
    },
});

export const { openNotificationsModel, closeNotificationsModel } = notificationsModelSlice.actions;
export default notificationsModelSlice.reducer;
