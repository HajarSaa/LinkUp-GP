import store from "../../redux_toolkit/store";
import { updateUserProfile, updateUserPhoto } from "../../redux_toolkit/api_data/userSlice";
import { setUserProfile } from "../../redux_toolkit/api_data/userProfileSlice";

export default function registerUserProfileHandlers(socket) {
  const state = store.getState();
  const viewedProfile = state.userProfile.data;
  const currentUser = state.currentUser.currentUser;
  const chatMate = state.convers.chatMate;
  const userProfilePanel = state.userProfile.data;

  const onProfileUpdated = ({ userId, profile }) => {
    if (currentUser?._id === profile._id) {
      store.dispatch(updateUserProfile(profile));
    }
    
    if (chatMate?._id === profile._id || chatMate?.user === userId) {
      store.dispatch({
        type: "convers/updateChatMate",
        payload: profile,
      });
    }

    if (userProfilePanel?._id === profile._id) {
      store.dispatch(setUserProfile({ ...profile, isMe: userProfilePanel.isMe }));
    }

    // New: update from workspace if needed
    store.dispatch({
      type: "workspace/updateMemberProfile",
      payload: profile,
    });
  };

  const onPhotoUpdated = ({ userId, photo }) => {
    if (currentUser?._id === userId) {
      store.dispatch(updateUserPhoto(photo));
    }

    if (chatMate?.user === userId || chatMate?._id === userId) {
      store.dispatch({
        type: "convers/updateChatMatePhoto",
        payload: photo,
      });
    }

    if (viewedProfile?._id === userId) {
      store.dispatch({
        type: "userProfile/updateViewedUserProfile",
        payload: { photo },
      });
    }
  };

socket.on("userProfile:photoUpdated", onPhotoUpdated);


  socket.on("userProfile:updated", onProfileUpdated);
  socket.on("userProfile:photoUpdated", onPhotoUpdated);

  return () => {
    socket.off("userProfile:updated", onProfileUpdated);
    socket.off("userProfile:photoUpdated", onPhotoUpdated);
  };
}
