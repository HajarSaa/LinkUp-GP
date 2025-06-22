import PropTypes from "prop-types";
import styles from "./EmojiPicker.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeEmojiPicker } from "../../../API/redux_toolkit/modals/emojiPickerSlice";
import EmojiPickerReact from "emoji-picker-react";

const EmojiPicker = ({ onSelect }) => {
  const { isOpen, position, messageId } = useSelector(
    (state) => state.emojiPicker
  );
  const dispatch = useDispatch();

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(closeEmojiPicker());
    }
  };

  const handleEmojiClick = (emojiData) => {
    if (onSelect) {
      onSelect(emojiData, messageId);
    }
    dispatch(closeEmojiPicker());
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleCloseModal}>
      <div
        className={styles.emoji_picker}
        style={{
          position: "absolute",
          top: position.top,
          left: position.left,
          zIndex: 9999,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <EmojiPickerReact
          onEmojiClick={handleEmojiClick}
          lazyLoadEmojis={true}
          height={400}
          width={320}
          emojiStyle="google"
        />
      </div>
    </div>
  );
};

EmojiPicker.propTypes = {
  onSelect: PropTypes.func,
};

export default EmojiPicker;
