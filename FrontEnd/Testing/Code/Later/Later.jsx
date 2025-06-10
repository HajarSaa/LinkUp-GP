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
    _id: "68306741209f14cfe5faae8b",
    content: "Hello everyone",
    createdBy: "682e5b380695df4545391ecc",
    channelId: "682e5b4d0695df4545391ee0",
    conversationId: null,
    parentMessageId: null,
    readBy: [],
    edited: false,
    createdAt: "2025-05-23T12:17:05.511Z",
    updatedAt: "2025-05-23T12:17:05.511Z",
    __v: 0,
  };
  const { workspace } = useSelector((state) => state.workspace);
  const sender = findMemberById(workspace, message?.createdBy);
  const message_time = formatTimeTo12Hour(message?.createdAt);
  const navigate = useNavigate();

  const navigateToMessage = () => {
    navigate(`/channels/${message.channelId}?later_message=${message._id}`);
  };
  return (
    <>
      <div className={styles.message_container} onClick={navigateToMessage}>
        <div className={styles.message}>
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
      </div>
    </>
  );
};

Later.propTypes = {
  isFirstMessage: PropTypes.bool,
  message: PropTypes.object,
};

export default Later;
