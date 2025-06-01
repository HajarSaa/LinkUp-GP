import { useRef, useState } from "react";
import styles from "./MessageInput.module.css";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoSend } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

const MessageInput = ({ isThread, channelName }) => {
  const [message, setMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const quillRef = useRef(null);

  const handleSend = () => {
    const plainText = quillRef.current.getEditor().getText().trim();
    if (!plainText) return;
    console.log("Send message:", message); // هنا تبعت للباك إند مثلاً
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleToggleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className={styles.messageInputContainer}>
      <div className={styles.input_field}>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={message}
          onChange={setMessage}
          onKeyDown={handleKeyDown}
          placeholder="Write your message..."
          className={styles.quillEditor}
        />

        {isThread && (
          <label className={styles.checkBox}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleToggleCheckbox}
              className={styles.checkBox_input}
            />
            <span className={styles.checkBox_text}>Also send to</span>
            {channelName && (
              <span className={styles.checkBox_channelName}>{channelName}</span>
            )}
          </label>
        )}

        <div className={styles.lower_row_icons}>
          <div className={styles.left_icons}>
            {/* ممكن تحط أيقونات إضافية */}
          </div>
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
    </div>
  );
};

MessageInput.propTypes = {
  channelName: PropTypes.string,
  isThread: PropTypes.bool,
};

export default MessageInput;
