/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { closeChatPanel } from "../../../../API/redux_toolkit/ui/chatPanelSlice";
import styles from "./ThreadPanel.module.css";
import { FaTimes } from "react-icons/fa";
import { BiSolidUser } from "react-icons/bi";
import MessageInput from "../../InputField/MessageInput/MessageInput";
import { useParams } from "react-router-dom";

function ThreadPanel({ selectedThread }) {
  const { threadPanel: isOpen } = useSelector((state) => state.chatPanel);
  const dispatch = useDispatch();
  const { id } = useParams();

  if (!isOpen) return null;
  return (
    <div className={styles.threadPanel}>
      <div className={styles.header}>
        <h3>Thread</h3>
        <FaTimes
          onClick={() => dispatch(closeChatPanel({type:'threadPanel',page_id:id}))}
          className={styles.closeIcon}
        />
      </div>

      <div className={styles.originalMessage}>
        <BiSolidUser />
        <div className={styles.messageContent}>
          <div className={styles.messageHeader}>
            <p>
              <strong>Ahemd</strong>
            </p>
            <p className={styles.timestamp}>
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <p>Hello</p>
        </div>
      </div>

      <div className={styles.replies}>
        {selectedThread.map((reply) => (
          <div key={reply.id} className={styles.reply}>
            <BiSolidUser />
            <div className={styles.messageContent}>
              <div className={styles.messageHeader}>
                <p>
                  <strong>{reply.sender}</strong>
                </p>
                <p className={styles.timestamp}>
                  {new Date(reply.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <p>{reply.text}</p>
            </div>
          </div>
        ))}
      </div>
      <MessageInput isThread={true} />
    </div>
  );
}

export default ThreadPanel;
