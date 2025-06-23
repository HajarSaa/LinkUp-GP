import { appendMessage as appendChannelMessage } from "../../redux_toolkit/api_data/messages/channelMessagesSlice";
import { appendMessage as appendConversationMessage } from "../../redux_toolkit/api_data/conversSlice";
import { addThreadMessage } from "../../redux_toolkit/api_data/messages/threadsSlice";

export default function registerMessageHandler(socket, dispatch) {
  const handleNewMessage = (payload) => {
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

  socket.on("newMessage", handleNewMessage);
  socket.on("threadReply", handleThreadReply);

  return () => {
    socket.off("newMessage", handleNewMessage);
    socket.off("threadReply", handleThreadReply);
  };
}
