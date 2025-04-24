import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import PropTypes from "prop-types";
import styles from "./EmojiPicker.module.css";
import { useEffect, useState } from "react";

const EmojiPicker = ({ onSelect, targetRef }) => {
  const [position, setPosition] = useState(null);
  const [height, setHeight] = useState(355);
  useEffect(() => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      console.log(rect.top, rect.left);
      setPosition(rect.left);
      setHeight((prev) => (rect.top > prev ? rect.top : prev));
    }
  }, []);
  return (
    <div className={styles.overlay}>
      {position !== null && (
        <div className={styles.emoji_picker} style={{ left: position }}>
          <Picker
            data={data}
            onEmojiSelect={onSelect}
            theme="light" // أو dark لو بتحب
          />
          {console.log(targetRef)}
        </div>
      )}
    </div>
  );
};

EmojiPicker.propTypes = {
  onSelect: PropTypes.func,
  targetRef: PropTypes.any,
};

export default EmojiPicker;
