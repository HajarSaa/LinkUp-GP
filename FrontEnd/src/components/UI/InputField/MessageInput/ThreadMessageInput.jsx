/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import styles from "./MessageInput.module.css";
import { HiMiniBold } from "react-icons/hi2";
import { FiItalic } from "react-icons/fi";
import { AiOutlineStrikethrough } from "react-icons/ai";
import { PiLinkBold } from "react-icons/pi";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { RiQuoteText } from "react-icons/ri";
import { IoCodeSlash } from "react-icons/io5";
import { PiCodeBlockBold } from "react-icons/pi";
import { IoSend } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LowerToolbar from "./InputComponents/LowerToolbar";
import useSendMessage from "../../../../API/hooks/messages/useSendMessage";
import useTypingEmitter from "../../../../API/hooks/socket/useTypingEmmiter";
import { v4 as uuidv4 } from "uuid";
import MediaContainer from "./MediaContainer/MediaContainer";
import UploadMenu from "./UploadMenu/UploadMenu";
import { clearFiles } from "../../../../API/redux_toolkit/api_data/media/fileUploadSlice";

const ThreadMessageInput = ({ parentMessageId }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { channel } = useSelector((state) => state.channel);
  const isChannel = location.pathname.includes("/channels");
  const pageId = `thread-${parentMessageId}`;


  const { pages } = useSelector((state) => state.fileUpload);
  const files = pages[pageId]?.files || [];
  const responseData = pages[pageId]?.responseData || [];

  const hasMedia = files.length > 0;
  const hasPendingMedia = files.some((f) => f.status === "pending");
  const canSend = (message.trim() || hasMedia) && !hasPendingMedia;

  const sendMessage = useSendMessage();
  const room = `thread:${parentMessageId}`;
  const emitTyping = useTypingEmitter(room);

  const send_also_to = isChannel ? channel.name : null;

  useEffect(() => {
    if (textareaRef.current) textareaRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setMessage(e.target.value);
    emitTyping();
  };

  const handleSend = () => {
    if (!canSend) return;

    const tempId = uuidv4();
    const type = isChannel ? "channel" : "conversation";

    const messageContent = {
      content: message,
      parentMessageId,
      attachmentIds: responseData,
      tempId,
    };

    sendMessage.mutate(
      { type, id, messageContent, tempId },
      {
        onSuccess: () => {
          setMessage("");
          setIsChecked(false);
          textareaRef.current.style.height = "40px";
          dispatch(clearFiles({ pageId }));
        },
      }
    );

    if (isChecked) {
      const secondaryContent = {
        content: message,
        attachmentIds: responseData, // ✅ كمان هنا لو بعت للـ channel
        tempId: uuidv4(),
      };

      sendMessage.mutate({ type, id, messageContent: secondaryContent });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <>
      <div className={styles.messageInputContainer}>
        <div className={styles.input_field}>
          <textarea
            name="messageBox"
            ref={textareaRef}
            className={styles.textarea}
            placeholder="write your message ..."
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onInput={handleInputHeight}
          />

          {isChannel && (
            <label htmlFor="checkbox" className={styles.checkBox}>
              <input
                id="checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className={styles.checkBox_input}
              />
              <span className={styles.checkBox_text}>Also send to</span>
              <span className={styles.checkBox_channelName}>
                {send_also_to}
              </span>
            </label>
          )}

          <MediaContainer pageId={pageId} />

          <div className={styles.lower_row_icons}>
            <LowerToolbar isThread={true} />
            <div
              className={`${styles.right_icons} ${
                canSend && styles.activeSend
              }`}
            >
              <div
                className={`${styles.sendBtns} ${styles.sendBtns_send}`}
                onClick={handleSend}
              >
                <IoSend />
              </div>
              <div className={styles.box11}></div>
              <div className={styles.sendBtns + " " + styles.sendBtns_dropdown}>
                <IoIosArrowDown />
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.newLineHint} ${!canSend && styles.hidden}`}>
          <span
            className={`${styles.hintText} ${
              canSend ? styles.showHint : styles.hideHint
            }`}
          >
            Shift + Enter for new line
          </span>
        </div>
      </div>
      <UploadMenu pageId={pageId} />
    </>
  );
};


export default ThreadMessageInput;

ThreadMessageInput.propTypes = {
  channelName: PropTypes.string,
  isThread: PropTypes.bool,
  parentMessageId: PropTypes.any.isRequired,
};

// const upperIcons = [
//   { icon: HiMiniBold },
//   { icon: FiItalic },
//   { icon: AiOutlineStrikethrough },
//   { icon: PiLinkBold },
//   { icon: MdOutlineFormatListNumbered },
//   { icon: MdOutlineFormatListBulleted },
//   { icon: RiQuoteText },
//   { icon: IoCodeSlash },
//   { icon: PiCodeBlockBold },
// ];

// const renderIcons = (icons, positions, iconClass, customClass) => {
//   return icons.map(({ icon: IconComponent }, index) => (
//     <React.Fragment key={index}>
//       <IconComponent className={`${iconClass} ${customClass}`} />
//       {positions.includes(index + 1) && <div className={styles.box11}></div>}
//     </React.Fragment>
//   ));
// };
