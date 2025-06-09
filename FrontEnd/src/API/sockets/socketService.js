import { io } from "socket.io-client";
const socket = io("https://link-up-beige.vercel.app/api/v1", {
  withCredentials: true,
});
export default socket;
