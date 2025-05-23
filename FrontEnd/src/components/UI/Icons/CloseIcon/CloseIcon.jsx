import styles from "./CloseIcon.module.css";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";

function CloseIcon({closeEvent,className}) {
  return (
    <span className={`${styles.closeBtn} ${className}`} onClick={closeEvent}>
      <IoClose className={styles.closeIcon} onClick={closeEvent} />
    </span>
  );
}

CloseIcon.propTypes = {
  closeEvent: PropTypes.func,
  className: PropTypes.any,
};

export default CloseIcon;
