import styles from "../MessageInput.module.css";
import { FaPlus } from "react-icons/fa6";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { BsEmojiSmile } from "react-icons/bs";
import { GoMention } from "react-icons/go";
import { AiOutlineAudio } from "react-icons/ai";
import { CgShortcut } from "react-icons/cg";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { openInputMenuModal } from "../../../../../API/redux_toolkit/modals/chat/inputMenu";

function LowerToolbar({ isThread, isEditing }) {
  const dispatch = useDispatch();

  function handleOpenInputMenu(e) {
    const menuHeight = 140;
    const padding = 8;
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const position = {
      x: buttonRect.left,
      y: buttonRect.top - menuHeight - padding,
    };
    dispatch(openInputMenuModal(position));
  }

  return (
    <div
      className={`${styles.left_icons} ${
        isThread ? styles.small_left_icons : ""
      }`}
    >
      {!isEditing && (
        <div className={styles.tool_wrapper} onClick={handleOpenInputMenu}>
          <span className={styles.tool_icon}>
            <FaPlus />
          </span>
        </div>
      )}

      <div className={styles.tool_wrapper}>
        <span className={styles.tool_icon}>
          <RxLetterCaseCapitalize />
        </span>
      </div>

      <div className={styles.tool_wrapper}>
        <span className={styles.tool_icon}>
          <BsEmojiSmile />
        </span>
      </div>

      {!isEditing && (
        <>
          <div className={styles.tool_wrapper}>
            <span className={styles.tool_icon}>
              <GoMention />
            </span>
          </div>
          <div className={styles.tool_wrapper}>
            <span className={styles.tool_icon}>
              <AiOutlineAudio />
            </span>
          </div>
          <div className={styles.tool_wrapper}>
            <span className={styles.tool_icon}>
              <CgShortcut />
            </span>
          </div>
        </>
      )}
    </div>
  );
}

LowerToolbar.propTypes = {
  isThread: PropTypes.bool,
  isEditing: PropTypes.bool,
};

export default LowerToolbar;
