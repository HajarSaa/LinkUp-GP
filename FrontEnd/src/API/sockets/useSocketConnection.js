// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import socket from "./socketService";
// import { setUserProfile } from "../redux_toolkit/api_data/userProfileSlice";
// import registerWorkspaceHandlers from "../sockets/handlers/workspaceHandler";
// import registerPresenceHandlers from "../sockets/handlers/presenceHandler";

// const useSocketConnection = () => {
//   const dispatch = useDispatch();
//   const currentUser = useSelector((state) => state.currentUser.currentUser);
//   const workspace = useSelector((state) => state.workspace.workspace);

//   useEffect(() => {
//     if (!currentUser || !workspace?._id) return;

//     socket.connect();

//     socket.emit("userConnected", currentUser._id, workspace._id, (response) => {
//       if (response?.success) {
//         dispatch(setUserProfile(response.profile));
//       }
//     });

//     const cleanupWorkspace = registerWorkspaceHandlers(socket, dispatch);
//     const cleanupPresence = registerPresenceHandlers(socket, dispatch);
//     return () => {
//       cleanupWorkspace();
//       cleanupPresence();
//       socket.disconnect();
//     };
//   }, [currentUser, workspace]);
// };

// export default useSocketConnection;


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "./socketService";
import { setUserProfile } from "../redux_toolkit/api_data/userProfileSlice";
import registerWorkspaceHandlers, {
  fetchWorkspaceMembers,
  setActiveWorkspace,
} from "../sockets/handlers/workspaceHandler";
import registerPresenceHandlers from "../sockets/handlers/presenceHandler";
import registerChannelHandlers from "../sockets/handlers/channelHandler";
const useSocketConnection = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const workspace = useSelector((state) => state.workspace.workspace);

  useEffect(() => {
    if (!currentUser || !workspace?._id) return;

    socket.connect();

    // 1. Connect user
    socket.emit("userConnected", currentUser._id, workspace._id, (response) => {
      if (response?.success) {
        dispatch(setUserProfile(response.profile));

        // 1.1 Join the workspace room
        socket.emit("joinWorkspaceRoom", workspace._id, (res) => {
          console.log("🏠 Joined workspace room:", res);
        });

        // 1.2 Set active workspace
        setActiveWorkspace(workspace._id, (res) => {
          console.log("📌 Active workspace set:", res);
        });

        // 1.3 Fetch workspace members
        fetchWorkspaceMembers(workspace._id, (res) => {
          if (res.success) {
            console.log("📋 Members list:", res.members);
          }
        });
      }
    });

    // 2. Register socket event handlers
    const cleanupWorkspace = registerWorkspaceHandlers(socket, dispatch);
    const cleanupPresence = registerPresenceHandlers(socket, dispatch);
    const cleanupChannel = registerChannelHandlers(socket, dispatch);
    return () => {
      cleanupWorkspace();
      cleanupPresence();
      cleanupChannel();
      socket.disconnect();
    };
  }, [currentUser, workspace]);
};

export default useSocketConnection;
