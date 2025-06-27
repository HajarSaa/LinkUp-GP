
// src/sockets/handlers/reactionHandler.js
import { setMessageReactions } from "../../redux_toolkit/api_data/messages/messageReactionsSlice";

export default function registerReactionHandler(socket, dispatch) {
  function onReactionUpdated({ messageId, emoji, userId, action }) {
    console.log("\uD83D\uDCE5 [reactionUpdated] Received:", {
      messageId,
      emoji,
      userId,
      action,
    });

    if (!messageId || !emoji || !userId || !action) return;

    dispatch({
      type: "messageReactions/updateFromSocket",
      payload: { messageId, emoji, userId, action },
    });
  }

  function onGetMessageReactionsResult({ messageId, groupedReactions }) {
    console.log("📥 [getMessageReactionsResult] Received:", {
    messageId,
    groupedReactions,
  });

    if (!messageId || !groupedReactions) return;

    dispatch(setMessageReactions({ messageId, groupedReactions }));
  }

  socket.on("reactionUpdated", onReactionUpdated);
  socket.on("getMessageReactionsResult", onGetMessageReactionsResult);

  console.log("🧲 reactionHandler registered");

  return () => {
    socket.off("reactionUpdated", onReactionUpdated);
    socket.off("getMessageReactionsResult", onGetMessageReactionsResult);
    console.log("❌ reactionHandler unregistered");
  };
}
