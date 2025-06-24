// import { useMutation } from "@tanstack/react-query";
// import { updateThisMessage } from "../../services/messages";

// function useUpdateMessage() {
//   return useMutation({
//     mutationFn: ({ message_id, content }) =>
//       updateThisMessage(message_id, content),
//   });
// }


// export default useUpdateMessage;


import { useMutation } from "@tanstack/react-query";
import { updateThisMessage } from "../../services/messages";
import socket from "../../sockets/socketService";

function useUpdateMessage() {
  return useMutation({
    mutationFn: ({ message_id, content }) =>
      updateThisMessage(message_id, content),
      onSuccess: (data) => {
        console.log("✉️ Sending editMessage socket from socket.id =", socket.id);
        const message = data?.message ?? data;
        console.log("✅ sending editMessage socket with:", {
          messageId: message._id,
          newContent: message.content,
        });
        socket.emit("editMessage", {
          messageId: message._id,
          newContent: message.content,
        }, (res) => {
  console.log("🟢 Edit callback response:", res);});
      }
  });
}

export default useUpdateMessage;
