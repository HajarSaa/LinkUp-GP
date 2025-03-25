import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedThread: null, // الرسالة اللي مفتوح عليها الـ Thread
};

const threadSlice = createSlice({
    name: "threads",
    initialState,
    reducers: {
        openThread: (state, action) => {
            state.selectedThread = action.payload; // تحديد الرسالة المفتوحة
        },
        closeThread: (state) => {
            state.selectedThread = null; // إغلاق الـ Thread
        },
    },
});

export const { openThread, closeThread } = threadSlice.actions;
export default threadSlice.reducer;
