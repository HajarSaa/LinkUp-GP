import { io } from "socket.io-client";
const socket = io("https://link-up-beige.vercel.app", {
  withCredentials: true,
  autoConnect: false,
  transports: ["websocket"],
});
export default socket;
