import { useEffect } from "react";
import socket from "../../sockets/socketService";
import { useDispatch, useSelector } from "react-redux";
import { setMessageReactions } from "../../redux_toolkit/api_data/messages/messageReactionsSlice";

function useGetMessageReactions(messageId) {
  const dispatch = useDispatch();
  const reactions = useSelector((state) => state.messageReactions[messageId]);
  const isLoading = !reactions;

  useEffect(() => {
    if (!messageId || !socket.connected) return;

    console.log("📤 Emitting getMessageReactions", messageId);
    socket.emit("getMessageReactions", { messageId }, (res) => {
      if (res?.success) {
        console.log("📥 Received from callback:", res.groupedReactions);
        dispatch(setMessageReactions({
          messageId,
          groupedReactions: res.groupedReactions,
        }));
      } else {
        console.error("❌ Error fetching reactions", res);
      }
    });
  }, [messageId]);

  return {
    data: {
      groupedReactions: reactions || {},
    },
    isLoading,
    isError: false,
  };
}

export default useGetMessageReactions;
