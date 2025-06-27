import { setMessageReactions } from "../../redux_toolkit/api_data/messages/messageReactionsSlice";

export default function registerReactionHandler(socket, dispatch) {
  function onReactionUpdated({ messageId, emoji, userId, action }) {
  const myId = JSON.parse(localStorage.getItem("currentUser"))._id;

  console.log("👤 My ID:", myId);
  console.log("📩 Incoming reactionUpdated:", {
    messageId,
    emoji,
    userId,
    action,
  });

  const isMyReaction = myId === userId;
  console.log("🧠 Is it my reaction?", isMyReaction);

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
