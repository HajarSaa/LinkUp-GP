import { BiSolidUser } from "react-icons/bi";
import styles from "./ChatMessage.module.css";
import { GoChevronRight } from "react-icons/go";
import { useDispatch } from "react-redux";
import { openThreadPanel } from "../../../API/redux_toolkit/ui/chatPanel";

function MessageThreads() {
  const dispatch = useDispatch();
  function openThreads() {
    dispatch(openThreadPanel());
  }
  return (
    <div className={styles.threadWrapper} onClick={openThreads}>
      <div className={styles.thread}>
        <div className={styles.thread_users}>
          <div className={styles.thread_user}>
            <BiSolidUser className={styles.profile} />
          </div>
          <div className={styles.thread_user}>
            <BiSolidUser className={styles.profile} />
          </div>
        </div>
        <div className={styles.thread_rightSide}>
          <div>
            <span className={styles.thread_counts}>{`4 replies   `}</span>
            <span className={styles.thread_time}>Today at 19:40</span>
            <span className={styles.viewThread}>View thread</span>
          </div>
          <span className={styles.thread_icon}>
            <GoChevronRight />
          </span>
        </div>
      </div>
    </div>
  );
}

export default MessageThreads;
