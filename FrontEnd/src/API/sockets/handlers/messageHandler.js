import { addThreadMessage } from "../../redux_toolkit/api_data/messages/threadsSlice";
import store from "../../redux_toolkit/store";
export default function registerMessageHandler(socket, dispatch) {
  console.log("📩 Listening to messageEdited on socket.id =", socket.id);
  const handleNewMessage = (payload) => {
    const { channelId, conversationId, parentMessageId } = payload;

    if (parentMessageId) {
      const currentThreadID = store.getState().chatPanel.threadPanel.threadID;

      if (parentMessageId !== currentThreadID) {
        console.log("⛔️ Ignoring thread message not for this tab");
        return;
      }

      console.log("✅ Thread message for this tab");
      dispatch({ type: "threads/addThreadMessage", payload });
      return;
    }

    if (channelId) {
      dispatch({
        type: "channelMessages/appendMessage",
        payload: { channel_id: channelId, message: payload },
      });
    } else if (conversationId) {
      dispatch({
        type: "conversMessages/appendMessage",
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
      type: "conversMessages/updateMessageContent",
      payload: { messageId, newContent, edited, editedAt, updatedAt },
    });
    console.log("🟢 updated convers messageContent via socket");

    dispatch({
      type: "threads/updateThreadMessageContent",
      payload: { messageId, newContent, edited, editedAt, updatedAt },
    });

    dispatch({
      type: "chatPanel/updateThreadParentContent",
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
