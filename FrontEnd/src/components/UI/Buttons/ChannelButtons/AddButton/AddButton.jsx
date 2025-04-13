import { FaPlus } from "react-icons/fa";
import styles from "./AddButton.module.css";
import PropTypes from "prop-types";
function AddButton({ clickEvent, text }) {
  return (
    <div
      className={`sideBarButton sideBarHover`}
      onClick={(e) => {
        e.stopPropagation();
        clickEvent();
      }}
    >
      <span className="hovered iconsPadding align-items-center">
        <FaPlus />
      </span>
      <span className={`${styles.text} iconsPadding`}>{text}</span>
    </div>
  );
}
AddButton.propTypes = {
  clickEvent: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default AddButton;
