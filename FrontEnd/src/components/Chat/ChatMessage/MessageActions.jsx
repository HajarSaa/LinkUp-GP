import { CiBookmark } from "react-icons/ci";
import styles from "./ChatMessage.module.css";
import { TbArrowForwardUp } from "react-icons/tb";
import { FiMoreVertical } from "react-icons/fi";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { MdOutlineAddReaction } from "react-icons/md";
import PropTypes from "prop-types";
import { openEmojiPicker } from "../../../API/redux_toolkit/modals/emojiPickerSlice";
import { useDispatch } from "react-redux";
import { openMessageMenuModal } from "../../../API/redux_toolkit/modals/chat/messageMenu";
import { calculateSafePosition } from "../../../utils/modalsUtils";

function MessageActions({ children, messageHover, message }) {
  const dispatch = useDispatch();

  const handelOpenMenu = (e, message_id) => {
    e.preventDefault();
    const menuWidth = 240;
    const padding = 0;
    const position = calculateSafePosition(e, menuWidth, null, padding);
    dispatch(
      openMessageMenuModal({ position: position, activeMessageId: message_id })
    );
  };

  if (!messageHover) return;
  return (
    <div className={styles.message_actions}>
      {children && <div className={styles.action_icon}></div>}
      <div
        className={styles.action_icon}
        onClick={() => {
          dispatch(openEmojiPicker());
        }}
      >
        <MdOutlineAddReaction />
      </div>
      <div className={styles.action_icon}>
        <BiMessageRoundedDetail />
      </div>
      <div className={styles.action_icon}>
        <TbArrowForwardUp />
      </div>
      <div className={styles.action_icon}>
        <CiBookmark />
      </div>
      <div
        className={styles.action_icon}
        onClick={(e) => {
          handelOpenMenu(e, message._id);
        }}
      >
        <FiMoreVertical />
      </div>
    </div>
  );
}

MessageActions.propTypes = {
  children: PropTypes.any,
  messageHover: PropTypes.bool,
  message: PropTypes.object.isRequired,
};
export default MessageActions;
