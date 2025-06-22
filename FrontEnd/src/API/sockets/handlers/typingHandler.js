
import { setTypingStatus } from "../../redux_toolkit/api_data/typingSlice";
import store from "../../redux_toolkit/store";

export default function registerTypingHandler(socket, dispatch) {
  socket.on("typing", ({ profileId, typingStatus, room }) => {
    const currentUserId = store.getState().currentUser.currentUser?._id;

    if (!room || profileId === currentUserId) return;

    dispatch(setTypingStatus({ room, profileId, typingStatus }));
  });

  return () => {
    socket.off("typing");
  };
}

