/* eslint-disable no-unused-vars */
import { BiSolidUser } from "react-icons/bi";
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
import { findMemberById } from "../../../utils/workspaceUtils";
import { formatTimeTo12Hour } from "../../../utils/formatedDate";
import UserImage from "../../UI/User/UserImage";
import { useParams } from "react-router-dom";

const MessageItem = ({ message }) => {
  const [emoji, setEmoji] = useState("");
  const add_react_ref = useRef(null);
  const [add_position, set_add_Position] = useState(null);
  const [messageHover, setMessageHover] = useState(false);
  const dispatch = useDispatch();
  const { id: page_id } = useParams();
  const { workspace } = useSelector((state) => state.workspace);
  const sender = findMemberById(workspace, message?.createdBy);
  const message_time = formatTimeTo12Hour(message?.createdAt);

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
        className={styles.message_container}
        onMouseEnter={() => setMessageHover(true)}
        onMouseLeave={() => setMessageHover(false)}
      >
        <div className={styles.message}>
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
              <div className={styles.message_text}>{message.content}</div>
            </div>
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
        <MessageActions messageHover={messageHover} />
      </div>
      <EmojiPicker position={add_position} onSelect={handleEmojiSelect} />
    </>
  );
};

MessageItem.propTypes = {
  isFirstMessage: PropTypes.bool,
  message: PropTypes.object,
};

export default MessageItem;
