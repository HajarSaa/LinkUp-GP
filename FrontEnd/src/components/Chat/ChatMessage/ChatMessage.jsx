/* eslint-disable no-unused-vars */
import { BiSolidUser } from "react-icons/bi";
import styles from "./ChatMessage.module.css";
import { MdOutlineAddReaction } from "react-icons/md";
import Reaction from "./Reaction";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "../../UI/EmojiPicker/EmojiPicker";
import { openEmojiPicker } from "../../../API/redux_toolkit/modals/emojiPickerSlice";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import MessageActions from "./MessageActions";
import MessageThreads from "./MessageThreads";

const ChatMessage = ({ isFirstMessage = true, message }) => {
  const [emoji, setEmoji] = useState("");
  const add_react_ref = useRef(null);
  const [add_position, set_add_Position] = useState(null);
  const [messageHover, setMessageHover] = useState(false);
  const dispatch = useDispatch();
  const showMessageHeader = isFirstMessage || message.thread.length > 0;


  const handleEmojiSelect = (emoji) => {
    setEmoji((prev) => prev + emoji.native);
  };
  function openEmojies() {
    dispatch(openEmojiPicker());
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
            {showMessageHeader ? (
              <div className={styles.profileWrapper}>
                {/* <img/> */}
                {/* لو فيه صوره هنضيفها مفيش يبقي الديفولت */}
                <BiSolidUser className={styles.profile} />
              </div>
            ) : (
              <>
                {messageHover && (
                  <div className={`${styles.message_time}`}>2:49 PM</div>
                )}
              </>
            )}
          </div>
          <div className={styles.message_rightSide}>
            <div className={styles.message_content}>
              {showMessageHeader && (
                <div className={styles.message_info}>
                  <div className={styles.message_sender}>{message.sender}</div>
                  <div className={styles.message_time}>2:49 PM</div>
                </div>
              )}
              <div className={styles.message_text}>{message.text}</div>
            </div>
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
            {showMessageHeader && <MessageThreads />}
          </div>
        </div>
        <MessageActions messageHover={messageHover} />
      </div>
      <EmojiPicker position={add_position} onSelect={handleEmojiSelect} />
    </>
  );
};

ChatMessage.propTypes = {
  isFirstMessage: PropTypes.bool,
  message: PropTypes.object,
};

export default ChatMessage;
