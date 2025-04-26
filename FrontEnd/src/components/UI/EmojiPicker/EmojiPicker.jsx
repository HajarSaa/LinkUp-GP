import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import PropTypes from "prop-types";
import styles from "./EmojiPicker.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeEmojiPicker } from "../../../API/redux_toolkit/modals/emojiPickerSlice";


const EmojiPicker = ({ onSelect, position }) => {
  const { isOpen } = useSelector((state) => state.emojiPicker);
  const dispatch = useDispatch();


  function handleClose() {
    dispatch(closeEmojiPicker());
  }

  if (!isOpen) return;
  return (
    <div className={styles.overlay} onClick={handleClose}>
      {position !== null && (
        <div className={styles.emoji_picker} style={{ left: position.left}}>
          <Picker
            data={data}
            onEmojiSelect={onSelect}
            theme="light" // or dark
            styles={{height:"100%"}}
          />
        </div>
      )}
    </div>
  );
};

EmojiPicker.propTypes = {
  onSelect: PropTypes.func,
  position: PropTypes.object,
};

export default EmojiPicker;
