import { useMutation } from "@tanstack/react-query";
import socket from "../../sockets/socketService";

function useToggleReaction() {
  return useMutation({
    mutationFn: ({ messageId, emoji }) => {
      return new Promise((resolve, reject) => {
        if (!messageId || !emoji) return reject("Invalid inputs");
        socket.emit("toggleReaction", { messageId, emoji }, (res) => {
          if (res?.success) return resolve(res);
          reject(res);
        });
      });
    },
  });
}

export default useToggleReaction;