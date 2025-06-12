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
import { openThreadPanel } from "../../../API/redux_toolkit/ui/chatPanelSlice";
import { useParams } from "react-router-dom";

function MessageActions({
  children,
  messageHover,
  message,
  isThreadParent = false,
  isThread = false,
  threadData,
  parentMessage,
  isSender = true
}) {
  const dispatch = useDispatch();
  const { id: page_id } = useParams();

  const handelOpenMenu = (e, message_id) => {
    e.preventDefault();
    const menuWidth = 240;
    const padding = 0;
    const position = calculateSafePosition(e, menuWidth, null, padding);
    dispatch(
      openMessageMenuModal({
        position: position,
        activeMessageId: message_id,
        isSender: isSender,
      })
    );
  };
  function openThreads() {
    console.log(threadData);
    dispatch(
      openThreadPanel({
        threadID: threadData.id,
        parentMessage: parentMessage,
        type: "threadPanel",
        page_id: page_id,
      })
    );
  }
  const style = { top: 0, right: 0 };

  if (!messageHover) return;
  return (
    <div
      className={styles.message_actions}
      style={isThreadParent ? style : undefined}
    >
      {children && <div className={styles.action_icon}></div>}
      <div
        className={styles.action_icon}
        onClick={() => {
          dispatch(openEmojiPicker());
        }}
      >
        <MdOutlineAddReaction />
      </div>
      {!isThread && (
        <div className={styles.action_icon} onClick={openThreads}>
          <BiMessageRoundedDetail />
        </div>
      )}
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
  isThread: PropTypes.bool,
  isThreadParent: PropTypes.bool,
  threadData: PropTypes.object,
  parentMessage: PropTypes.object,
  isSender: PropTypes.bool,
};
export default MessageActions;
