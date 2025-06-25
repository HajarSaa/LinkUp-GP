import store from "../../redux_toolkit/store";
import { addThreadMessage } from "../../redux_toolkit/api_data/messages/threadsSlice";
import {
  addChannelMedia,
  removeChannelMedia,
} from "../../redux_toolkit/api_data/media/channelMediaSlice";
import {
  addConversMedia,
  removeConversMedia,
} from "../../redux_toolkit/api_data/media/conversMediaSlice";
import { RemoveFromOpenedThreadPanelItems } from "../../../utils/panelUtils";

export default function registerMessageHandler(socket, dispatch) {
  console.log("📩 Listening to message events on socket.id =", socket.id);

  const handleNewMessage = (payload) => {
  const {
    _id: messageId,
    channelId,
    conversationId,
    parentMessageId,
    attachments = [],
  } = payload;

  // ✅ Add attachments (media) to media slices
  if (attachments.length > 0) {
    attachments.forEach((file) => {
      const mediaFile = {
        ...file,
        messageId,
      };

      if (channelId) {
        dispatch(addChannelMedia(mediaFile));
      } else if (conversationId) {
        dispatch(addConversMedia(mediaFile));
      }
    });
  }

  // ✅ Handle thread reply
  if (parentMessageId) {
    const currentThreadID = store.getState().chatPanel.threadPanel.threadID;
    if (parentMessageId !== currentThreadID) return;

    dispatch({ type: "threads/addThreadMessage", payload });
    return;
  }

  // ✅ Regular message
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


  const handleThreadReply = (payload) => {
    dispatch(addThreadMessage(payload));
  };

  const handleMessageEdited = (payload) => {
    dispatch({ type: "channelMessages/updateMessageContent", payload });
    dispatch({ type: "conversMessages/updateMessageContent", payload });
    dispatch({ type: "threads/updateThreadMessageContent", payload });
    dispatch({ type: "chatPanel/updateThreadParentContent", payload });
  };

  const handleMessageDeleted = (payload) => {
    const { messageId, channelId, conversationId, attachmentIds = [] } = payload;

    dispatch({ type: "channelMessages/removeMessageById", payload: { messageId } });
    dispatch({ type: "conversMessages/removeMessageById", payload: { messageId } });
    dispatch({ type: "threads/removeThreadMessageById", payload: { messageId } });

    attachmentIds.forEach((fileId) => {
      if (channelId) {
        dispatch(removeChannelMedia({ fileId }));
      } else if (conversationId) {
        dispatch(removeConversMedia({ fileId }));
      }
    });

    const state = store.getState();
    const { threadPanel } = state.chatPanel;
    const { messageMenu } = state;
    const pageId = window.location.pathname.split("/").pop();

    if (messageMenu.activeMessageId === messageId) {
      dispatch({ type: "messageMenu/clearMessageMenu" });
    }

    if (threadPanel.isOpen && threadPanel.parentMessage?._id === messageId) {
      dispatch({
        type: "chatPanel/closeChatPanel",
        payload: { type: "threadPanel", page_id: pageId },
      });
      RemoveFromOpenedThreadPanelItems(pageId);
      dispatch({ type: "threads/clearThreads" });
    }
  };

  socket.on("newMessage", handleNewMessage);
  socket.on("threadReply", handleThreadReply);
  socket.on("messageEdited", handleMessageEdited);
  socket.on("messageDeleted", handleMessageDeleted);

  return () => {
    socket.off("newMessage", handleNewMessage);
    socket.off("threadReply", handleThreadReply);
    socket.off("messageEdited", handleMessageEdited);
    socket.off("messageDeleted", handleMessageDeleted);
  };
}
