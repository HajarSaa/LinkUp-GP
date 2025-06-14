/* eslint-disable no-unused-vars */
import styles from "./ChatMessage.module.css";
import { MdOutlineAddReaction } from "react-icons/md";
import Reaction from "./Reaction";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "../../UI/EmojiPicker/EmojiPicker";
import { openEmojiPicker } from "../../../API/redux_toolkit/modals/emojiPickerSlice";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import MessageActions from "./MessageActions";
import MessageThreads from "./MessageThreads";
import { openUserPanel } from "../../../API/redux_toolkit/ui/chatPanelSlice";
import {
  findMemberById,
  findMemberByUserId,
} from "../../../utils/workspaceUtils";
import { formatTimeTo12Hour } from "../../../utils/formatedDate";
import UserImage from "../../UI/User/UserImage";
import { useParams } from "react-router-dom";
import MessageMenu from "../MessageMenu/MessageMenu";
import { openMessageMenuModal } from "../../../API/redux_toolkit/modals/chat/messageMenu";
import { calculateSafePosition } from "../../../utils/modalsUtils";
import { getAttachedFiles } from "../../../utils/mediaUtils";
import AttachmentRenderer from "./AttachmentRender";

const MessageItem = ({
  message,
  isInThreadPanel = false,
  isThreadParent = false,
}) => {
  const [emoji, setEmoji] = useState("");
  const add_react_ref = useRef(null);
  const [add_position, set_add_Position] = useState(null);
  const [messageHover, setMessageHover] = useState(false);
  const dispatch = useDispatch();
  const { id: page_id } = useParams();
  const { workspace } = useSelector((state) => state.workspace);
  const sender = findMemberById(workspace, message?.createdBy);
  const loggin_user = findMemberByUserId(workspace);
  const isMessageSender = sender._id === loggin_user._id;
  const message_time = formatTimeTo12Hour(message?.createdAt);
  const { activeMessageId } = useSelector((state) => state.messageMenu);
  const { messageId, isEditing } = useSelector((state) => state.editMessage);
  const { channelMedia } = useSelector((state) => state.channelMedia);
  const messageFiles = getAttachedFiles(message, channelMedia);

  const threadData = {
    count: message?.threadCount,
    participants: message?.threadParticipants,
    id: message?._id,
    lastRepliedAt: message?.lastRepliedAt,
  };
  const editingMessage = messageId === message._id;

  const handleEmojiSelect = (emoji) => {
    setEmoji((prev) => prev + emoji.native);
  };
  function openEmojies() {
    dispatch(openEmojiPicker());
  }

  function openProfile() {
    dispatch(
      openUserPanel({
        type: "userPanel",
        panel_id: sender.id || sender._id,
        page_id: page_id,
      })
    );
  }

  const updatePosition = () => {
    if (add_react_ref.current) {
      const rect = add_react_ref.current.getBoundingClientRect();
      set_add_Position({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }
  };

  const handelOpenMenu = (e, message_id) => {
    e.preventDefault();
    const menuWidth = 240;
    const padding = 0;
    const position = calculateSafePosition(e, menuWidth, null, padding);
    dispatch(
      openMessageMenuModal({
        position: position,
        activeMessageId: message_id,
        isSender: isMessageSender,
        isInThread: isInThreadPanel,
      })
    );
  };

  useEffect(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("zoom", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("zoom", updatePosition);
    };
  }, []);

  return (
    <>
      <div
        className={`${styles.message_container} ${
          activeMessageId === message._id && styles.active
        } ${editingMessage && isEditing ? styles.editingMessage : ""}`}
        onMouseEnter={() => setMessageHover(true)}
        onMouseLeave={() => setMessageHover(false)}
        onContextMenu={(e) => {
          handelOpenMenu(e, message._id);
        }}
      >
        <div className={styles.message} id={`message-${message._id}`}>
          <div className={styles.message_leftSide}>
            <div className={styles.profileWrapper} onClick={openProfile}>
              <UserImage src={sender.photo} alt={sender.userName} />
            </div>
          </div>
          <div className={styles.message_rightSide}>
            <div className={styles.message_content}>
              <div className={styles.message_info}>
                <div className={styles.message_sender} onClick={openProfile}>
                  {sender.userName}
                </div>
                <div className={styles.message_time}>{message_time}</div>
              </div>
              <div
                className={styles.message_text}
                id={`message-content-${message._id}`}
              >
                {message.content}
                {message.edited && (
                  <span className={styles.edited_label}>(edited)</span>
                )}
              </div>
              {messageFiles.length > 0 && (
                <div className={styles.attachments}>
                  {messageFiles.map((file) => (
                    <div key={file._id} className={styles.attachmentItem}>
                      <AttachmentRenderer file={file} />
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Reactions */}
            {message.reactions && (
              <div className={styles.reactions}>
                <Reaction reactions={message.reactions} />
                <div
                  className={styles.add_react}
                  onClick={openEmojies}
                  ref={add_react_ref}
                >
                  <MdOutlineAddReaction />
                </div>
              </div>
            )}
          </div>
        </div>
        <MessageActions
          isThread={isInThreadPanel}
          message={message}
          messageHover={messageHover}
          isThreadParent={isThreadParent}
          threadData={threadData}
          parentMessage={message}
          isSender={isMessageSender}
        />
        {message?.threadCount !== 0 && !isInThreadPanel && (
          <MessageThreads threadData={threadData} parentMessage={message} />
        )}
      </div>
      <EmojiPicker position={add_position} onSelect={handleEmojiSelect} />
      <MessageMenu />
    </>
  );
};

MessageItem.propTypes = {
  isFirstMessage: PropTypes.bool,
  message: PropTypes.object,
  isInThreadPanel: PropTypes.bool,
  isThreadParent: PropTypes.bool,
};

export default MessageItem;
