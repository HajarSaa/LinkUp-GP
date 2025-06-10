// // src/components/SocketTester.jsx
// import { useEffect } from "react";
// import { io } from "socket.io-client";

// const socket = io("https://link-up-beige.vercel.app", {
//   withCredentials: true,
//   transports: ["websocket"],
// });

// const SocketTester = () => {
//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("✅ Connected to socket:", socket.id);
//     });

//     socket.on("connect_error", (err) => {
//       console.error("❌ Connection Error:", err.message);
//     });

//     socket.on("disconnect", () => {
//       console.log("❌ Disconnected from socket");
//     });

//     return () => {
//       socket.off("connect");
//       socket.off("connect_error");
//       socket.off("disconnect");
//     };
//   }, []);

//   return <div>🧪 Testing socket connection... check console!</div>;
// };

// export default SocketTester;
