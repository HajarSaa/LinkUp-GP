// // // src/components/SocketTester.jsx
// // import { useEffect } from "react";
// // import { io } from "socket.io-client";

// // const socket = io("http://127.0.0.1:5000", {
// //   withCredentials: true,
// //   transports: ["websocket"],
// // });

// // const SocketTester = () => {
// //   useEffect(() => {
// //     socket.on("connect", () => {
// //       console.log("✅ Connected to socket:", socket.id);
// //     });

// //     socket.on("connect_error", (err) => {
// //       console.error("❌ Connection Error:", err.message);
// //     });

// //     socket.on("disconnect", () => {
// //       console.log("❌ Disconnected from socket");
// //     });

// //     return () => {
// //       socket.off("connect");
// //       socket.off("connect_error");
// //       socket.off("disconnect");
// //     };
// //   }, []);

// //   return <div>🧪 Testing socket connection... check console!</div>;
// // };

// // export default SocketTester;


// import { useSelector } from "react-redux";

// const OnlineUsersList = () => {
//   const onlineUsers = useSelector((state) => state.workspace.onlineUsers);

//   return (
//     <div>
//       <h3>Online Users:</h3>
//       <ul>
//         {onlineUsers?.length > 0 ? (
//           onlineUsers.map((userId) => (
//             <li key={userId}>{userId}</li>
//           ))
//         ) : (
//           <p>No users online</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default OnlineUsersList;


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