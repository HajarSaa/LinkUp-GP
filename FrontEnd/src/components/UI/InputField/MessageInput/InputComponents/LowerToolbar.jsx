import styles from "../MessageInput.module.css";
import { FaPlus } from "react-icons/fa6";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { BsEmojiSmile } from "react-icons/bs";
import { GoMention } from "react-icons/go";
import { AiOutlineAudio } from "react-icons/ai";
import { CgShortcut } from "react-icons/cg";
import PropTypes from "prop-types";


function LowerToolbar({ isThread ,isEditing }) {
  const icons = [
    { icon: FaPlus },
    { icon: RxLetterCaseCapitalize },
    { icon: BsEmojiSmile },
    { icon: GoMention },
    { icon: AiOutlineAudio },
    { icon: CgShortcut },
  ];
  const lowerIcons = isEditing ? icons.slice(1, 3) : icons;
  return (
    <div
      className={`${styles.left_icons} ${isThread && styles.small_left_icons}`}
    >
      {lowerIcons.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div key={index} className={styles.tool_wrapper}>
            <span className={styles.tool_icon}>
              <IconComponent />
            </span>
          </div>
        );
      })}
    </div>
  );
}
LowerToolbar.propTypes = {
  isThread: PropTypes.bool,
  isEditing: PropTypes.bool,
};

export default LowerToolbar;
