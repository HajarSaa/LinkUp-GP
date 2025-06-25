import { useMutation } from "@tanstack/react-query";
import socket from "../../sockets/socketService";

function useDeleteMessage() {
  return useMutation({
    mutationFn: (messageId) =>
      new Promise((resolve, reject) => {
        socket.emit("deleteMessage", messageId, (res) => {
          if (res?.success) {
            resolve(res);
          } else {
            reject(res?.error || "Delete failed");
          }
        });
      }),
  });
}

export default useDeleteMessage;

