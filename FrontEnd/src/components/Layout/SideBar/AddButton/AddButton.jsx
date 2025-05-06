import { FaPlus } from "react-icons/fa";
import styles from "./AddButton.module.css";
import PropTypes from "prop-types";
function AddButton({text }) {
  return (
    <>
      <div
        className={styles.add_button}
      >
        <span className={styles.icon}>
          <FaPlus />
        </span>
        <span className={styles.add_button_text}>{text}</span>
      </div>
    </>
  );
}
AddButton.propTypes = {
  clickEvent: PropTypes.func,
  text: PropTypes.string,
};

export default AddButton;
