// // import { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import socket from "./socketService";
// // import { setUserProfile } from "../redux_toolkit/api_data/userProfileSlice";
// // import { setOnlineUsers } from "../redux_toolkit/api_data/workspaceSlice";

// // const useSocketConnection = () => {
// //   const dispatch = useDispatch();
// //   const currentUser = useSelector((state) => state.currentUser.currentUser);
// //   const workspace = useSelector((state) => state.workspace.workspace);

// //   useEffect(() => {
// //     if (!currentUser || !workspace?._id) return;

// //     socket.connect();

// //     socket.emit(
// //       "userConnected",
// //       currentUser._id,
// //       workspace._id,
// //       (response) => {
// //         if (response?.success) {
// //           dispatch(setUserProfile(response.profile));
// //         }
// //       }
// //     );

// //     socket.on("presenceUpdate", ({ userIds }) => {
// //       dispatch(setOnlineUsers(userIds));
// //     });
    
// //     return () => {
// //       socket.disconnect();
// //     };
// //   }, [currentUser, workspace]);
// // };

// // export default useSocketConnection;


// // import { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import socket from "./socketService";
// // import { setUserProfile } from "../redux_toolkit/api_data/userProfileSlice";
// // import { setUserStatuses, updateUserStatus } from "../redux_toolkit/api_data/workspaceSlice";

// // const useSocketConnection = () => {
// //   const dispatch = useDispatch();
// //   const currentUser = useSelector((state) => state.currentUser.currentUser);
// //   const workspace = useSelector((state) => state.workspace.workspace);

// //   useEffect(() => {
// //     if (!currentUser || !workspace?._id) return;

// //     socket.connect();

// //     socket.emit(
// //       "userConnected",
// //       currentUser._id,
// //       workspace._id,
// //       (response) => {
// //         if (response?.success) {
// //           dispatch(setUserProfile(response.profile));
// //         }
// //       }
// //     );

// //     // socket.emit(
// //     //   "userConnected",
// //     //   currentUser._id,
// //     //   workspace._id,
// //     //   (response) => {
// //     //     if (response?.success) {
// //     //       dispatch(setUserProfile(response.profile));
// //     //       dispatch(updateUserStatus({
// //     //         userId: response.profile.user,
// //     //         status: response.status,
// //     //         customStatus: response.customStatus
// //     //       }));
// //     //     }
// //     //   }
// //     // );


// //     socket.on("userStatusChanged", ({ userId, status, customStatus }) => {
// //       dispatch(updateUserStatus({ userId, status, customStatus }));
// //     });
    
// //     // لما يعمل اتصال أول مرة
// //     socket.emit("getActiveUsers", workspace._id, (response) => {
// //       if (response?.success) {
// //         const statusMap = {};
// //         response.users.forEach(({ userId, status, customStatus }) => {
// //           statusMap[userId] = { status, customStatus };
// //         });
// //         dispatch(setUserStatuses(statusMap));
// //       }
// //     });
       
// //     return () => {
// //       socket.disconnect();
// //     };
// //   }, [currentUser, workspace]);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       socket.emit("presenceHeartbeat");
// //     }, 10000); 

// //     return () => clearInterval(interval);
// //   }, []);
// // };

// // export default useSocketConnection;
// /***********************For workspace connection******************************/
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import socket from "./socketService";
// import { setUserProfile } from "../redux_toolkit/api_data/userProfileSlice";
// import { setOnlineUsers } from "../redux_toolkit/api_data/workspaceSlice";

// // handlers
// import registerConnectionHandlers from "../sockets/handlers/connectionHandler";
// import registerWorkspaceHandlers from "../sockets/handlers/workspaceHandler";

// const useSocketConnection = () => {
//   const dispatch = useDispatch();
//   const currentUser = useSelector((state) => state.currentUser.currentUser);
//   const workspace = useSelector((state) => state.workspace.workspace);

//   useEffect(() => {
//     if (!currentUser || !workspace?._id) return;

//     // تأكد إن الـ socket مش متوصل مرتين
//     if (!socket.connected) {
//       socket.connect();
//     }

//     // Step 1: Emit `userConnected`
//     socket.emit(
//       "userConnected",
//       currentUser._id,
//       workspace._id,
//       (response) => {
//         if (response?.success) {
//           dispatch(setUserProfile(response.profile));
//         }
//       }
//     );

//     // Step 2: Register socket handlers from separate modules
//     const cleanupConnection = registerConnectionHandlers(socket, dispatch);
//     const cleanupWorkspace = registerWorkspaceHandlers(socket, dispatch);

//     return () => {
//       // Step 3: Cleanup
//       cleanupConnection();
//       cleanupWorkspace();
//       socket.disconnect();
//     };
//   }, [currentUser, workspace]);
// };

// export default useSocketConnection;


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "./socketService";
import { setUserProfile } from "../redux_toolkit/api_data/userProfileSlice";
import { initWorkspaceHandlers } from "../sockets/handlers/workspaceHandler";

const useSocketConnection = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const workspace = useSelector((state) => state.workspace.workspace);

  useEffect(() => {
    if (!currentUser || !workspace?._id) return;

    socket.connect();

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

    // ✅ فعل workspace handlers
    initWorkspaceHandlers(dispatch);

    return () => {
      socket.disconnect();
    };
  }, [currentUser, workspace]);
};

export default useSocketConnection;
