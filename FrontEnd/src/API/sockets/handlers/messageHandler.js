import { addThreadMessage } from "../../redux_toolkit/api_data/messages/threadsSlice";

export default function registerMessageHandler(socket, dispatch) {
  console.log("📩 Listening to messageEdited on socket.id =", socket.id);

  const handleNewMessage = (payload) => {
    console.log("NEW SOCKET MESSAGE:", payload);
    const { channelId, conversationId, parentMessageId } = payload;

    // If it's a thread reply, don't insert it into the main list
    if (parentMessageId) {
      dispatch({ type: "threads/addThreadMessage", payload });
      return;
    }
    if (channelId) {
      dispatch({
        type: "channelMessages/appendMessage",
        payload: { channel_id: channelId, message: payload },
      });
    } 
    else if (conversationId) {
      dispatch({
        type: "conversation/appendMessage",
        payload: { conversation_id: conversationId, message: payload },
      });
    }
  };

  // Handle "threadReply" event
  const handleThreadReply = (payload) => {
    dispatch(addThreadMessage(payload));
  };
  const handleMessageEdited = (payload) => {
    const { messageId, newContent, edited, editedAt, updatedAt } = payload;
    console.log("🟡 messageEdited received:", payload);

    dispatch({
      type: "channelMessages/updateMessageContent",
      payload: { messageId, newContent, edited, editedAt, updatedAt },
    });

    dispatch({
      type: "conversation/updateMessageContent",
      payload: { messageId, newContent, edited, editedAt, updatedAt },
    });

    dispatch({
      type: "threads/updateThreadMessageContent",
      payload: { messageId, newContent, edited, editedAt, updatedAt },
    });
  };

  socket.on("newMessage", handleNewMessage);
  socket.on("threadReply", handleThreadReply);
  socket.on("messageEdited", handleMessageEdited);
  
  return () => {
    socket.off("newMessage", handleNewMessage);
    socket.off("threadReply", handleThreadReply);
    socket.off("messageEdited", handleMessageEdited);
  };
}
