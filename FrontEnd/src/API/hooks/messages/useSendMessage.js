import { useMutation } from "@tanstack/react-query";
import socket from "../../sockets/socketService";
function useSendMessage() {
  return useMutation({
    mutationFn: ({ type, id, messageContent, tempId }) => {
      return new Promise((resolve, reject) => {
        if (!socket.connected) {
          return reject(new Error("Socket is not connected"));
        }

        socket.emit(
          "sendMessage",
          {
            ...messageContent,
            tempId, // for optimistic UI
            channelId: type === "channel" ? id : null,
            conversationId: type === "conversation" ? id : null,
          },
          (response) => {
            if (response?.success) {
              resolve(response.message);
            } else {
              reject(response?.error || new Error("Failed to send message"));
            }
          }
        );
      });
    },
  });
}

export default useSendMessage;
