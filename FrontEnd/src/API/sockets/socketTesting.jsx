import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "./socketService";
import { setUserProfile } from "../redux_toolkit/api_data/userProfileSlice";
import { setOnlineUsers } from "../redux_toolkit/api_data/workspaceSlice";

const useSocketConnection = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const workspace = useSelector((state) => state.workspace.workspace);

  useEffect(() => {
    if (!currentUser || !workspace?._id) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit(
      "userConnected",
      currentUser._id,
      workspace._id,
      (response) => {
        if (response?.success) {
          dispatch(setUserProfile(response.profile));
        }
      }
    );

    socket.on("presenceUpdate", ({ userIds }) => {
      dispatch(setOnlineUsers(userIds));
    });

    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [currentUser, workspace]);
};

export default useSocketConnection;