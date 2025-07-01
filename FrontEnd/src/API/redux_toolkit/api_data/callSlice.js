// redux_toolkit/api_data/callSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  callStatus: "idle", // idle | incoming | in-call | ended
  fromUser: null,
  conversationId: null,
  muted: false,
  videoEnabled: false,
  screenSharing: false,
};

const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    setIncomingCall: (state, action) => {
      state.callStatus = "incoming";
      state.fromUser = action.payload.from;
      state.conversationId = action.payload.conversationId;
    },
    acceptCall: (state) => {
      state.callStatus = "in-call";
    },
    rejectCall: (state) => {
      state.callStatus = "idle";
      state.fromUser = null;
      state.conversationId = null;
    },
    endCall: (state) => {
      state.callStatus = "ended";
    },
    resetCall: () => initialState,
    toggleMute: (state, action) => {
      state.muted = action.payload;
    },
    toggleVideo: (state, action) => {
      state.videoEnabled = action.payload;
    },
    toggleScreenShare: (state, action) => {
      state.screenSharing = action.payload;
    },
  },
});

export const {
  setIncomingCall,
  acceptCall,
  rejectCall,
  endCall,
  resetCall,
  toggleMute,
  toggleVideo,
  toggleScreenShare,
} = callSlice.actions;

export default callSlice.reducer;
