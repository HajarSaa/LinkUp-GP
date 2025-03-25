import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    channelData: null,
    activeTab: "about", // ✅ إضافة المتغير الجديد
};

const channelDetailsSlice = createSlice({
    name: "channelDetails",
    initialState,
    reducers: {
        openChannelDetails: (state, action) => {
            state.isOpen = true;
            state.channelData = action.payload.channel;
            state.activeTab = action.payload.tab || "about"; // ✅ التاب يجي من الـ payload أو يكون "about" كافتراضي
        },
        closeChannelDetails: (state) => {
            state.isOpen = false;
            state.channelData = null;
            state.activeTab = "about"; // ✅ عند الإغلاق، يرجع للتاب الافتراضي
        },
        setActiveTab: (state, action) => {
            state.activeTab = action.payload; // ✅ تحديث التاب المختار
        },
    },
});

export const { openChannelDetails, closeChannelDetails, setActiveTab } = channelDetailsSlice.actions;
export default channelDetailsSlice.reducer;
