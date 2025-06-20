import { createSlice } from "@reduxjs/toolkit";

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    channel: null,
  },
  reducers: {
    setChannel: (state, action) => {
      state.channel = action.payload;
    },
  },
});

export const { setChannel, setChanLoading, setChanError } = channelSlice.actions;

export default channelSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   channel: null,
//   channelList: [],
// };

// const channelSlice = createSlice({
//   name: "channel",
//   initialState,
//   reducers: {
//     setChannel: (state, action) => {
//       state.channel = action.payload;
//     },
//     setChannelList: (state, action) => {
//       state.channelList = action.payload;
//     },
//     addChannel: (state, action) => {
//       state.channelList.push(action.payload);
//     },
//     updateChannel: (state, action) => {
//       const index = state.channelList.findIndex(c => c._id === action.payload._id);
//       if (index !== -1) {
//         state.channelList[index] = { ...state.channelList[index], ...action.payload };
//       }
//     },
//     removeChannel: (state, action) => {
//       state.channelList = state.channelList.filter(c => c._id !== action.payload);
//     },
//   },
// });

// export const {
//   setChannel,
//   setChannelList,
//   addChannel,
//   updateChannel,
//   removeChannel,
// } = channelSlice.actions;

// export default channelSlice.reducer;
