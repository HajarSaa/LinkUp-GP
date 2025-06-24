import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "./socketService";
import { setUserProfile } from "../redux_toolkit/api_data/userProfileSlice";
import registerWorkspaceHandlers, {
  fetchWorkspaceMembers,
  setActiveWorkspace,
} from "../sockets/handlers/workspaceHandler";
import registerChannelHandlers from "../sockets/handlers/channelHandler";
import registerTypingHandler from "../sockets/handlers/typingHandler";
import registerMessageHandler from "../sockets/handlers/messageHandler";

const useSocketConnection = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const workspace = useSelector((state) => state.workspace.workspace);

  useEffect(() => {
    if (!currentUser || !workspace?._id) return;

    socket.connect();

    let cleanupFunctions = [];

    const onConnect = () => {
      console.log("✅ Socket connected with ID:", socket.id);
      socket.userId = currentUser._id;

      socket.emit("userConnected", currentUser._id, workspace._id, (response) => {
        if (response?.success) {
          dispatch(setUserProfile(response.profile));

          socket.emit("joinWorkspaceRoom", workspace._id, (res) => {
            console.log("🏠 Joined workspace room:", res);
          });

          setActiveWorkspace(workspace._id, (res) => {
            console.log("📌 Active workspace set:", res);
          });

          fetchWorkspaceMembers(workspace._id, (res) => {
            if (res.success) {
              console.log("📋 Members list:", res.members);
            }
          });

          socket.emit("updateStatus", { status: "online" });

          const cleanupWorkspace = registerWorkspaceHandlers(socket, dispatch);
          const cleanupChannel = registerChannelHandlers(socket, dispatch);
          const cleanupTyping = registerTypingHandler(socket, dispatch);
          const cleanupMessage = registerMessageHandler(socket, dispatch);

          cleanupFunctions = [
            cleanupWorkspace,
            cleanupChannel,
            cleanupTyping,
            cleanupMessage,
          ];
        }
      });
    };

    socket.on("connect", onConnect);

    return () => {
      socket.off("connect", onConnect);
      cleanupFunctions.forEach((fn) => fn?.());
      socket.disconnect();
    };
  }, [currentUser, workspace]);
};

export default useSocketConnection;
