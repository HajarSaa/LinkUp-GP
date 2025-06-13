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
import LowerToolbar from "./InputComponents/LowerToolbar";
import { closeEditMessageInput } from "../../../../API/redux_toolkit/api_data/messages/editMessageSlice";
import { useDispatch, useSelector } from "react-redux";
import useUpdateMessage from "../../../../API/hooks/messages/useUpdateMessage";
import Spinner from "../../Spinner/Spinner";

const EditMessageInput = () => {
  const { messageId, messageText } = useSelector((state) => state.editMessage);
  const update_message = useUpdateMessage();
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setMessage(messageText);
  }, [messageText]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSave = async () => {
    if (!message.trim() || message.trim() === messageText.trim()) {
      dispatch(closeEditMessageInput());
      return;
    }
    update_message.mutate(
      {
        message_id: messageId,
        content: { content: message },
      },
      {
        onSuccess: () => {
          dispatch(closeEditMessageInput());
        },
      }
    );
  };

  const handleCancel = async () => {
    console.log(`cancel this edit`);
    dispatch(closeEditMessageInput());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  const handlInputHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height
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
          <LowerToolbar isEditing={true} />
          <div className={styles.right_btns}>
            <button
              type="button"
              className={styles.cancel_edit}
              onClick={handleCancel}
            >
              <span>cancel</span>
            </button>
            <button
              type="button"
              className={styles.save_edit}
              onClick={handleSave}
            >
              <span>
                {update_message.isPending ? (
                  <Spinner width={20} height={20} color="var(--green-color)" />
                ) : (
                  "save"
                )}
              </span>
            </button>
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

export default EditMessageInput;

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
