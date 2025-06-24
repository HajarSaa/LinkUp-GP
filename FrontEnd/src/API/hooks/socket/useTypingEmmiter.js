
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setActiveTypingRoom } from "../../redux_toolkit/api_data/typingSlice";
import socket from "../../sockets/socketService";

const useTypingEmitter = (room) => {
  const timeoutRef = useRef(null);
  const dispatch = useDispatch();

  const emitTyping = () => {
    if (!room) return;

    dispatch(setActiveTypingRoom(room));

    socket.emit("typing", {
      room,
      typingStatus: true,
    });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      socket.emit("typing", {
        room,
        typingStatus: false,
      });
    }, 500);
  };

  return emitTyping;
};

export default useTypingEmitter;
