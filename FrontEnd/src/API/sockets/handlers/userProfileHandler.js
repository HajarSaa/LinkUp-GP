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

    // Update profile in workspace member list
    store.dispatch({
      type: "workspace/updateMemberProfile",
      payload: profile,
    });
  };

  const onPhotoUpdated = ({ userId, profileId, photo }) => {
    // Update current user photo if applicable
    if (currentUser?._id === profileId || currentUser?._id === userId) {
      store.dispatch(updateUserPhoto(photo));
    }

    // Update photo in chatMate if it's them
    if (chatMate?._id === profileId || chatMate?.user === userId) {
      store.dispatch({
        type: "convers/updateChatMatePhoto",
        payload: photo,
      });
    }

    // Update photo in viewed profile
    if (viewedProfile?._id === profileId || viewedProfile?.user === userId) {
      store.dispatch({
        type: "userProfile/updateViewedUserProfile",
        payload: { photo },
      });
    }

    // Update photo in UserPanel modal if open
    if (userProfilePanel?._id === profileId || userProfilePanel?.user === userId) {
      store.dispatch(setUserProfile({ ...userProfilePanel, photo }));
    }

    // Update photo in workspace list (for all members)
    store.dispatch({
      type: "workspace/updateMemberPhoto",
      payload: { userId, profileId, photo },
    });
  };

  socket.on("userProfile:updated", onProfileUpdated);
  socket.on("userProfile:photoUpdated", onPhotoUpdated);

  return () => {
    socket.off("userProfile:updated", onProfileUpdated);
    socket.off("userProfile:photoUpdated", onPhotoUpdated);
  };
}
