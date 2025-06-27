

// // note for Alaa ❗
// //✅ this endpoint send emoji if new and delete it if its exist for the same person ✅

// import { useMutation } from "@tanstack/react-query"
// import { toggleReaction } from "../../services/reactions"

// function useToggleReaction() {
//   return useMutation({
//     mutationFn: ({ messageId, emoji }) => toggleReaction(messageId, emoji),
//   });
// }

// export default useToggleReaction


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