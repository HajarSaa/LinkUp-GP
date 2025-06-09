import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import CloseIcon from "../Icons/CloseIcon/CloseIcon";

const Modal = ({
  isOpen,
  onClose,
  children,
  className,
  zIndex = 1000,
  title = "",
}) => {
  function handleCloseModal(e) {
    if (e.target === e.currentTarget) onClose();
  }
  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      style={{ zIndex: zIndex - 1 }}
      onClick={handleCloseModal}
    >
      <div className={`${styles.modal} ${className}`} style={{ zIndex }}>
        <div className={styles.modal_header}>
          <h2 className={styles.title}>{title}</h2>
          <CloseIcon closeEvent={onClose} />
        </div>
        <div className={styles.modal_body}>{children}</div>
      </div>
    </div>
  );
  // document.body
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  zIndex: PropTypes.number,
  title: PropTypes.string,
};

export default Modal;
