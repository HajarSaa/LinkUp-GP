import { FaPlus } from "react-icons/fa";
import styles from "./AddButton.module.css";
import PropTypes from "prop-types";
function AddButton({ onAddChannel, text }) {
  return (
    <div
      className={`sideBarButton sideBarHover`}
      onClick={(e) => {
        e.stopPropagation();
        onAddChannel();
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
  onAddChannel: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default AddButton;
