/* eslint-disable no-unused-vars */
import { BiSolidUser } from "react-icons/bi";
import styles from "./Later.module.css";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { findMemberById } from "../../../src/utils/workspaceUtils";
import { formatTimeTo12Hour } from "../../../src/utils/formatedDate";
import UserImage from "../../../src/components/UI/User/UserImage";
import { useNavigate } from "react-router-dom";

const Later = () => {
  const message = {
    _id: "683ba6e355e990953b742f4f",
    content: "أَتَتَوَعَدُنَا بِمَا نَنتَظِر يَا ابنَ اليَهُويَّة",
    createdBy: "682e5b380695df4545391ecc",
    channelId: "682e5b4d0695df4545391ee0",
    conversationId: null,
    parentMessageId: null,
    threadCount: 0,
    threadParticipants: [],
    readBy: [],
    edited: false,
    createdAt: "2025-06-01T01:03:31.620Z",
    updatedAt: "2025-06-01T01:03:31.620Z",
    __v: 0,
  };
  const message2 = {
    _id: "683bab32b9aa601b35aa96f3",
    content: "يارب الخلااااص عشااان خلااااص",
    createdBy: "682e5c170695df4545391ef5",
    channelId: "682e5b4d0695df4545391ee0",
    conversationId: null,
    parentMessageId: null,
    threadCount: 0,
    threadParticipants: [],
    readBy: [],
    edited: false,
    createdAt: "2025-06-01T01:21:54.823Z",
    updatedAt: "2025-06-01T01:21:54.823Z",
    __v: 0,
  };
  const { workspace } = useSelector((state) => state.workspace);
  const sender = findMemberById(workspace, message?.createdBy);
  const sender2 = findMemberById(workspace, message2?.createdBy);
  const message_time = formatTimeTo12Hour(message?.createdAt);
  const message_time2 = formatTimeTo12Hour(message2?.createdAt);
  const navigate = useNavigate();

  const navigateToMessage1 = () => {
    navigate(`/channels/${message.channelId}?later_message=${message._id}`);
  };
  const navigateToMessage2 = () => {
    navigate(`/channels/${message2.channelId}?later_message=${message2._id}`);
  };
  return (
    <>
      <div className={styles.message_container}>
        <div className={styles.message} onClick={navigateToMessage1}>
          <div className={styles.message_leftSide}>
            <div className={styles.profileWrapper}>
              <UserImage src={sender.photo} alt={sender.userName} />
            </div>
          </div>
          <div className={styles.message_rightSide}>
            <div className={styles.message_content}>
              <div className={styles.message_info}>
                <div className={styles.message_sender}>{sender.userName}</div>
                <div className={styles.message_time}>{message_time}</div>
              </div>
              <div className={styles.message_text}>{message.content}</div>
            </div>
          </div>
        </div>
        <div className={styles.message} onClick={navigateToMessage2}>
          <div className={styles.message_leftSide}>
            <div className={styles.profileWrapper}>
              <UserImage src={sender2.photo} alt={sender2.userName} />
            </div>
          </div>
          <div className={styles.message_rightSide}>
            <div className={styles.message_content}>
              <div className={styles.message_info}>
                <div className={styles.message_sender}>{sender2.userName}</div>
                <div className={styles.message_time}>{message_time2}</div>
              </div>
              <div className={styles.message_text}>{message2.content}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Later.propTypes = {
  isFirstMessage: PropTypes.bool,
  message: PropTypes.object,
};

export default Later;


// Add this to chat body


  // روح لل later message
  // useEffect(() => {
  //   if (!targetMessageId || !messages?.length) return;

  //   const tryScrollToTarget = async () => {
  //     const MAX_TRIES = 20;
  //     let tries = 0;

  //     while (tries < MAX_TRIES) {
  //       const element = document.getElementById(`message-${targetMessageId}`);
  //       if (element) {
  //         element.scrollIntoView({ behavior: "smooth", block: "center" });

  //         // ✨ أضف الكلاس
  //         element.classList.add(styles.highlight);

  //         // ⏱️ شيل الكلاس بعد 2 ثانية
  //         setTimeout(() => {
  //           element.classList.remove(styles.highlight);
  //         }, 2000);

  //         break;
  //       }

  //       if (!hasNextPage || isFetchingNextPage) break;

  //       await fetchNextPage();
  //       tries++;
  //     }
  //   };

  //   tryScrollToTarget();
  // }, [
  //   targetMessageId,
  //   messages,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  // ]);