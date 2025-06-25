// src/sockets/handlers/reactionHandler.js

import {
  addReactionSocket as addChannelReaction,
  removeReactionSocket as removeChannelReaction,
  setMessageReactionsFromSocket as setChannelMessageReactions,
} from "../../redux_toolkit/api_data/messages/channelMessagesSlice";

import {
  addReactionSocket as addThreadReaction,
  removeReactionSocket as removeThreadReaction,
  setMessageReactionsFromSocket as setThreadMessageReactions,
} from "../../redux_toolkit/api_data/messages/threadsSlice";

import {
  addReactionSocket as addConversReaction,
  removeReactionSocket as removeConversReaction,
  setMessageReactionsFromSocket as setConversMessageReactions,
} from "../../redux_toolkit/api_data/messages/conversMessagesSlice";

// import socket from "../socketService";

export default function registerReactionHandler(socket, dispatch) {
  const handleReactionUpdated = (data) => {
    const { messageId, emoji, userId, action } = data;

    if (action === "added") {
      dispatch(addChannelReaction({ messageId, emoji, userId }));
      dispatch(addThreadReaction({ messageId, emoji, userId }));
      dispatch(addConversReaction({ messageId, emoji, userId }));
    } else if (action === "removed") {
      dispatch(removeChannelReaction({ messageId, emoji, userId }));
      dispatch(removeThreadReaction({ messageId, emoji, userId }));
      dispatch(removeConversReaction({ messageId, emoji, userId }));
    }
  };

  const handleSetReactions = (data) => {
    const { messageId, groupedReactions } = data;

    dispatch(setChannelMessageReactions({ messageId, groupedReactions }));
    dispatch(setThreadMessageReactions({ messageId, groupedReactions }));
    dispatch(setConversMessageReactions({ messageId, groupedReactions }));
  };

  socket.on("reactionUpdated", handleReactionUpdated);
  socket.on("messageReactionsFetched", handleSetReactions);

  return () => {
    socket.off("reactionUpdated", handleReactionUpdated);
    socket.off("messageReactionsFetched", handleSetReactions);
  };
}