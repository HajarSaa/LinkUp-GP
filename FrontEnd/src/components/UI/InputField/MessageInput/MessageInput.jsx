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
import { useLocation, useParams } from "react-router-dom";
import LowerToolbar from "./InputComponents/LowerToolbar";
import useSendMessage from "../../../../API/hooks/messages/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);
  const location = useLocation();
  const { id } = useParams();
  const isChannel = location.pathname.includes("/channels");
  const send_message = useSendMessage();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    const messageContent = {
      content: message,
    };
    const type = isChannel ? "channel" : "conversation";
    console.log("Type:", type, "ID:", id, "Message:", messageContent);
    console.log(messageContent)
    // send_message.mutate(
    //   {
    //     type,
    //     id,
    //     messageContent,
    //   },
    //   {
    //     onSuccess: () => {
    //       setMessage("");
    //       const textarea = textareaRef.current;
    //       textarea.style.height = "40px";
    //     },
    //   }
    // );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlInputHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  return (
    <div className={styles.messageInputContainer}>
      <div className={styles.input_field}>
        <div className={styles.upper_row_icons}>
          {renderIcons(
            upperIcons,
            [3, 6],
            styles.upper_icons,
            styles.upper_icon_style
          )}
        </div>
        <textarea
          name="messageBox"
          ref={textareaRef}
          className={styles.textarea}
          placeholder="write your message ..."
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onInput={handlInputHeight}
        />

        <div className={styles.lower_row_icons}>
          <LowerToolbar/>
          <div
            className={`${styles.right_icons} ${
              message.trim() && styles.activeSend
            }`}
          >
            <div
              className={`${styles.sendBtns} ${styles.sendBtns_send}`}
              onClick={handleSend}
            >
              <IoSend />
            </div>
            <div className={styles.box11}></div>

            <div className={`${styles.sendBtns} ${styles.sendBtns_dropdown}`}>
              <IoIosArrowDown />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles.newLineHint} ${!message.trim() && styles.hidden}`}
      >
        <span
          className={`${styles.hintText} ${
            message.trim() ? styles.showHint : styles.hideHint
          }`}
        >
          Shift + Enter for new line
        </span>
      </div>
    </div>
  );
};

export default MessageInput;

const upperIcons = [
  { icon: HiMiniBold },
  { icon: FiItalic },
  { icon: AiOutlineStrikethrough },
  { icon: PiLinkBold },
  { icon: MdOutlineFormatListNumbered },
  { icon: MdOutlineFormatListBulleted },
  { icon: RiQuoteText },
  { icon: IoCodeSlash },
  { icon: PiCodeBlockBold },
];

const renderIcons = (icons, positions, iconClass, customClass) => {
  return icons.map(({ icon: IconComponent }, index) => (
    <React.Fragment key={index}>
      <IconComponent className={`${iconClass} ${customClass}`} />
      {positions.includes(index + 1) && <div className={styles.box11}></div>}
    </React.Fragment>
  ));
};
