// // import { useQuery } from "@tanstack/react-query";
// // import { getMessageReactions } from "../../services/reactions";

// // function useGetMessageReactions(message_id) {
// //   const query =  useQuery({
// //     queryKey: [`message-reactions-${message_id}`],
// //     queryFn: () => getMessageReactions(message_id),
// //     enabled: !!message_id,
// //     retry: 1,
// //   });

// //   return query;
// // }

// // export default useGetMessageReactions;

// import { useEffect, useState } from "react";
// import socket from "../../sockets/socketService";
// import { useSelector } from "react-redux";

// function useGetMessageReactions(messageId) {
//   const reactions = useSelector((state) => state.messageReactions[messageId]);
//   const [isRequested, setIsRequested] = useState(false);

//   useEffect(() => {
//     if (!messageId || reactions || isRequested || !socket.connected) return;

//     socket.emit("getMessageReactions", { messageId });
//     setIsRequested(true);
//   }, [messageId, reactions, isRequested]);

//   return {
//     data: {
//       groupedReactions: reactions,
//     },
//     isLoading: !reactions,
//     isError: false,
//   };
// }

// export default useGetMessageReactions;


import { useEffect } from "react";
import socket from "../../sockets/socketService";
import { useSelector } from "react-redux";

function useGetMessageReactions(messageId) {
  const reactions = useSelector((state) => state.messageReactions[messageId]);

  useEffect(() => {
    if (!messageId || !socket.connected) return;

    console.log("📤 Emitting getMessageReactions", messageId);
    socket.emit("getMessageReactions", { messageId });
  }, [messageId]);

  return {
    data: {
      groupedReactions: reactions || {},
    },
    isLoading: false,
    isError: false,
  };
}

export default useGetMessageReactions;
