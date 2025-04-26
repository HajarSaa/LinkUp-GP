import styles from "./ThreadPanel.module.css";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { closeThread } from "../../../../API/redux_toolkit/chat/channel/threadSlice";
import MessageInput from "../messageInput/MessageInput";

const ThreadPanel = () => {
    const dispatch = useDispatch();
    const selectedThread = useSelector((state) => state.threads.selectedThread);

    if (!selectedThread) return null;


    return (
        <div className={styles.threadPanel}>
            <div className={styles.header}>
                <h3>Thread</h3>
                <FaTimes onClick={() => dispatch(closeThread())} className={styles.closeIcon} />
            </div>

            {/* ✅ الرسالة الأصلية */}
            <div className={styles.originalMessage}>
                <img src={`/assets/avatars/${selectedThread.sender.toLowerCase()}.png`}
                    alt={selectedThread.sender}
                    className={styles.avatar}
                />
                <div className={styles.messageContent}>
                    <div className={styles.messageHeader}>
                        <p><strong>{selectedThread.sender}</strong></p>
                        <p className={styles.timestamp}>
                            {new Date(selectedThread.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                    </div>
                    <p>{selectedThread.text}</p>
                </div>
            </div>

            {/* ✅ قائمة الردود */}
            <div className={styles.replies}>
                {selectedThread.thread.map((reply) => (
                    <div key={reply.id} className={styles.reply}>
                        <img src={`/assets/avatars/${reply.sender.toLowerCase()}.png`}
                            alt={reply.sender}
                            className={styles.avatar}
                        />
                        <div className={styles.messageContent}>
                            <div className={styles.messageHeader}>
                                <p><strong>{reply.sender}</strong></p>
                                <p className={styles.timestamp}>
                                    {new Date(reply.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </p>
                            </div>
                            <p>{reply.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ✅ إدخال رد جديد */}
            <MessageInput />
        </div>
    );
};

export default ThreadPanel;
