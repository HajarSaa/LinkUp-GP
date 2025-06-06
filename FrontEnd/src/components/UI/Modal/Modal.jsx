import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import CloseIcon from "../Icons/CloseIcon/CloseIcon";

const Modal = ({ isOpen, onClose, children, className, zIndex = 1000 }) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className={styles.overlay}
        style={{ zIndex: zIndex - 1 }}
        onClick={onClose}
      ></div>
      <div className={`${styles.modal} ${className}`} style={{ zIndex }}>
        <CloseIcon className={styles.closeModal} closeEvent={onClose} />
        {children}
      </div>
    </>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  zIndex: PropTypes.number,
};

export default Modal;
