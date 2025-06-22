import { useDispatch, useSelector } from "react-redux";
import { closeChatPanel } from "../../../../API/redux_toolkit/ui/chatPanelSlice";
import styles from "./ThreadPanel.module.css";
import MessageItem from "../../../Chat/ChatMessage/MessageItem";
import { useParams } from "react-router-dom";
import CloseIcon from "../../Icons/CloseIcon/CloseIcon";
import useGetThreads from "../../../../API/hooks/messages/useGetThreads";
import Spinner from "../../Spinner/Spinner";
import ThreadMessageInput from "../../InputField/MessageInput/ThreadMessageInput";
import EditMessageInput from "../../InputField/MessageInput/EditMessageInput";
import useRoomSubscription from "../../../../API/hooks/socket/useRoomSubscription";
import TypingIndicator from "../../../Chat/TypingIndicator/TypingIndicator";

function ThreadPanel() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isOpen, threadID, parentMessage } = useSelector(
    (state) => state.chatPanel.threadPanel
  );
  const { isEditing, isInThread } = useSelector((state) => state.editMessage);
  const get_thread = useGetThreads(threadID);
  const { threads } = useSelector((state) => state.threads);
  let error_message = null;
  const roomId = threadID ? `thread:${threadID}` : null;
  useRoomSubscription(roomId);
  if (get_thread.error)
    if (get_thread.error.response.status) error_message = "";
    else error_message = get_thread.error.message;

  function handleClose() {
    dispatch(closeChatPanel({ type: "threadPanel", page_id: id }));
  }

  if (!isOpen) return null;
  return (
    <div className={styles.threadPanel}>
      <div className={styles.header}>
        <h3>Thread</h3>
        <CloseIcon closeEvent={handleClose} />
      </div>

      <MessageItem
        message={parentMessage}
        isThreadParent={true}
        isInThreadPanel={true}
      />
      {get_thread.isLoading || !threads ? (
        <div className={styles.status}>
          <Spinner />
        </div>
      ) : get_thread.isError ? (
        <div className={styles.status}>
          <span className={styles.error}>{error_message}</span>
        </div>
      ) : (
        <div className={styles.thread_body}>
          <div className={styles.divider}>
            <span>{`${threads.length} replie${
              threads.length === 0 ? "" : "s"
            }`}</span>
            <span className={styles.line}></span>
          </div>
          <div className={styles.replies}>
            {threads.map((thread) => (
              <MessageItem
                isInThreadPanel={true}
                key={thread._id}
                message={thread}
              />
            ))}
          </div>
        </div>
      )}
      <TypingIndicator roomId={`thread:${threadID}`} />
      {isEditing && isInThread ? (
        <EditMessageInput />
      ) : (
        <ThreadMessageInput parentMessageId={threadID} />
      )}
    </div>
  );
}

export default ThreadPanel;
