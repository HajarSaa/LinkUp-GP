import { useDispatch, useSelector } from "react-redux";
import { closeChatPanel } from "../../../../API/redux_toolkit/ui/chatPanelSlice";
import styles from "./ThreadPanel.module.css";
import MessageInput from "../../InputField/MessageInput/MessageInput";
import MessageItem from "../../../Chat/ChatMessage/MessageItem";
import { useParams } from "react-router-dom";
import CloseIcon from "../../Icons/CloseIcon/CloseIcon";
import useGetThreads from "../../../../API/hooks/messages/useGetThreads";
import Spinner from "../../Spinner/Spinner";

function ThreadPanel() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isOpen, threadID, parentMessage } = useSelector(
    (state) => state.chatPanel.threadPanel
  );
  const get_thread = useGetThreads(threadID);
  const { threads } = useSelector((state) => state.threads);

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

      {get_thread.isLoading || !threads ? (
        <div className={styles.status}>
          <Spinner />
        </div>
      ) : get_thread.isError ? (
        <div className={styles.status}>
          <span className={styles.error}>{get_thread.error.message}</span>
        </div>
      ) : (
        <div className={styles.thread_body}>
          <MessageItem
            message={parentMessage}
            isThreadParent={true}
            isInThreadPanel={true}
          />
          <div className={styles.divider}>
            <span>{`${threads.length} replie${
              threads.length === 0 ? "" : "s"
            }`}</span>
            <span className={styles.line}></span>
          </div>
          <div className={styles.replies}>
            {threads.map((thread) => (
              // <div key={reply.id} className={styles.reply}>
              //   <BiSolidUser />
              //   {console.log(threads)}
              //   <div className={styles.messageContent}>
              //     <div className={styles.messageHeader}>
              //       <p>
              //         <strong>{reply.sender}</strong>
              //       </p>
              //       <p className={styles.timestamp}>
              //         {new Date(reply.timestamp).toLocaleTimeString([], {
              //           hour: "2-digit",
              //           minute: "2-digit",
              //         })}
              //       </p>
              //     </div>
              //     <p>{reply.text}</p>
              //   </div>
              // </div>
              <MessageItem
                isInThreadPanel={true}
                key={thread._id}
                message={thread}
              />
            ))}
          </div>
        </div>
      )}
      <MessageInput isThread={true} />
    </div>
  );
}

export default ThreadPanel;
